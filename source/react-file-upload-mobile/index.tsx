import React, { useState, useMemo } from 'react';
import { Toast } from 'antd-mobile';
import Compressor from 'compressorjs';

import './index.less';

type IReactFileUploadMobileProps = {
  wrapCls?: string; // 外部className
  fileUrl: string; // 文件绝对链接
  fileName: string; // 文件名
  displayOnly: boolean; // 是否为纯展示
  preview?: () => void; // 点击缩略图回调
  compressImg?: number; // 图片压缩率，0-1之间的一位小数，0或1为不压缩
  download?: boolean; // 只做展示的情况下，展示是否允许下载
  onFileDelete?: any; // 非展示的情况下，点击按钮删除
  onFileUpload?: (file: File) => void; // 上传
};
const SuffixForAll = [
  'docx',
  'doc',
  'xlsx',
  'xls',
  'pptx',
  'ppt',
  'jpg',
  'png',
  'gif',
  'jpeg',
  'mp4',
  'avi',
  'zip',
  'rar',
];
const SuffixForImage = ['jpg', 'png', 'gif', 'jpeg'];

const ReactFileUploadMobile = (props: IReactFileUploadMobileProps) => {
  const {
    wrapCls,
    fileUrl,
    fileName,
    displayOnly,
    onFileDelete,
    onFileUpload,
    compressImg = 0.8,
    download,
    preview,
  } = props;
  const [refInput, setRefInput] = useState();
  const getFileSuffix = (fileFullName: string) => {
    if (!fileFullName) return '';
    const arr = fileFullName.split('.');
    return arr[arr.length - 1];
  };
  /**
   * @returns
   * false boolean 没有文件
   * 'image' string 图片文件
   * ${*} string 其他格式文件后缀名
   */
  const suffix = useMemo(() => {
    if (fileUrl && fileName) {
      const s = getFileSuffix(fileName).toLowerCase(); // 获得当前文件名的后缀
      return SuffixForImage.indexOf(s) >= 0 ? 'image' : s;
    }
    return false;
  }, [fileUrl, fileName]);

  const imageCompressor = (file: File) => {
    const quality: number = Number(compressImg.toFixed(1));
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality,
        success(result) {
          // Blob转换成File类型
          const f = new window.File([result], file.name, { type: file.type });
          resolve({ status: 0, data: f });
        },
        error(err) {
          console.warn(err);
          reject({ status: -1, data: err });
        },
      });
    });
  };
  // 图片上传，校验格式、大小，然后调用onFileUpload
  const selectFile = async () => {
    const file = refInput.files[0];
    if (!file) {
      // 没有选择图片的情况
      return;
    }
    const { size, name } = file;
    const fileSuffix = getFileSuffix(file.name);
    if (-1 === SuffixForAll.indexOf(fileSuffix)) {
      Toast.info('上传附件格式错误', 2);
      return;
    }
    // 校验文件名长度
    const fileRealName = name.substring(
      name.lastIndexOf('\\') + 1,
      name.lastIndexOf('.'),
    );
    if (fileRealName.replace('/[^\x00-\xff]/g', '**').length > 30) {
      Toast.info('上传文件名过长,请修改后上传', 2);
      return;
    }
    // 校验大小
    if (size > 50 * 1024 * 1024) {
      Toast.info('附件过大，压缩到50M以下', 2);
      return;
    }
    // 文件为图片，且需要压缩时候，进行压缩上传
    if (
      0 < compressImg &&
      compressImg < 1 &&
      SuffixForImage.indexOf(fileSuffix) >= 0
    ) {
      const res: any = await imageCompressor(file);
      if (res.status >= 0) {
        uploadServer(res.data);
      } else {
        // 压缩失败，直接传原图片
        uploadServer(file);
      }
      return;
    }
    uploadServer(file);
  };
  const uploadServer = async (file: File) => {
    onFileUpload && onFileUpload(file);
  };
  // 清除附件
  const clearAttachment = () => {
    onFileDelete && onFileDelete();
  };

  const downloadFile = (url: string) => {
    window.open(url);
  };

  const previewPicture = () => {
    // 如果允许预览，则preview为true
    preview && preview();
  };
  return (
    <div className={`file-upload ${wrapCls}`}>
      <div className='file-upload-inner'>
        {suffix && (
          <div className='img-wrapper'>
            {suffix === 'image' ? (
              <span
                className='icon'
                style={{
                  backgroundImage: `url('${fileUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
                onClick={previewPicture}
              />
            ) : (
              <i className='icon'>{suffix}</i>
            )}
          </div>
        )}
        {suffix && suffix !== 'image' && displayOnly && <p>{fileName}</p>}

        {/* 展示的情况下,有附件同时支持下载 */}
        {displayOnly && suffix && download && (
          <span
            className='link'
            onClick={() => {
              downloadFile(fileUrl);
            }}
          >
            下载附件
          </span>
        )}
        {!displayOnly && suffix && (
          <div>
            <span className='link' onClick={clearAttachment}>
              删除
            </span>
            <span className='link'>
              重新上传
              <input
                type='file'
                ref={i => {
                  setRefInput(i);
                }}
                onChange={selectFile}
              />
            </span>
          </div>
        )}
        {/* 上传附件，区别于重新上传 */}
        {!displayOnly && !suffix && (
          <span className='upload'>
            <input
              type='file'
              ref={i => {
                setRefInput(i);
              }}
              onChange={selectFile}
            />
          </span>
        )}
      </div>
      {!displayOnly && (
        <div className='notes'>
          可上传以下格式的附件：.docx，.doc，.xlsx，xls，.pptx，.ppt，.jpg，.png，.gif，.jpeg，.mp4，.avi，.zip，.rar
        </div>
      )}
    </div>
  );
};

export default ReactFileUploadMobile;
