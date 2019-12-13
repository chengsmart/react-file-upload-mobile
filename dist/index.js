import { __awaiter, __generator, __read } from "tslib";
import React, { useState, useMemo } from "react";
import { Modal, Toast } from "antd-mobile";
// import Loading, { LoadingType } from "@components/loading";
// import { uploadAttachment } from "@api/case";
import Lightbox from "react-image-lightbox";
import Compressor from "compressorjs";
import "react-image-lightbox/style.css";
import "./index.less";
var alert = Modal.alert;
var SuffixForAll = [
    "docx",
    "doc",
    "xlsx",
    "xls",
    "pptx",
    "ppt",
    "jpg",
    "png",
    "gif",
    "jpeg",
    "mp4",
    "avi",
    "zip",
    "rar"
];
var SuffixForImage = ["jpg", "png", "gif", "jpeg"];
var FileUpload = function (props) {
    var fileUrl = props.fileUrl, fileName = props.fileName, displayOnly = props.displayOnly, onFileDelete = props.onFileDelete, onFileUpload = props.onFileUpload, compressImg = props.compressImg, download = props.download, preview = props.preview;
    // const [isFetching, setFetching] = useState(false);
    var _a = __read(useState(false), 2), viewImage = _a[0], setViewImage = _a[1];
    var _b = __read(useState(), 2), refInput = _b[0], setRefInput = _b[1];
    var getFileSuffix = function (fileFullName) {
        if (!fileFullName)
            return "";
        var arr = fileFullName.split(".");
        return arr[arr.length - 1];
    };
    /**
     * @returns
     * false boolean 没有文件
     * 'image' string 图片文件
     * ${*} string 其他格式文件后缀名
     */
    var suffix = useMemo(function () {
        if (fileUrl && fileName) {
            var s = getFileSuffix(fileName).toLowerCase(); // 获得当前文件名的后缀
            return SuffixForImage.indexOf(s) >= 0 ? "image" : s;
        }
        return false;
    }, [fileUrl, fileName]);
    var imageCompressor = function (file) {
        return new Promise(function (resolve, reject) {
            new Compressor(file, {
                quality: 0.6,
                success: function (result) {
                    // Blob转换成File类型
                    var f = new window.File([result], file.name, { type: file.type });
                    resolve({ status: 0, data: f });
                },
                error: function (err) {
                    console.warn(err);
                    reject({ status: -1, data: err });
                }
            });
        });
    };
    // 图片上传，上传成功后回调onAfterUpload，用于保存url和name
    var selectFile = function () { return __awaiter(void 0, void 0, void 0, function () {
        var file, size, name, fileSuffix, fileRealName, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = refInput.files[0];
                    if (!file) {
                        // 没有选择图片的情况
                        return [2 /*return*/];
                    }
                    size = file.size, name = file.name;
                    fileSuffix = getFileSuffix(file.name);
                    if (-1 == SuffixForAll.indexOf(fileSuffix)) {
                        Toast.info("上传附件格式错误", 2);
                        return [2 /*return*/];
                    }
                    fileRealName = name.substring(name.lastIndexOf("\\") + 1, name.lastIndexOf("."));
                    if (fileRealName.replace("/[^\x00-\xff]/g", "**").length > 30) {
                        Toast.info("上传文件名过长,请修改后上传", 2);
                        return [2 /*return*/];
                    }
                    // 校验大小
                    if (size > 50 * 1024 * 1024) {
                        Toast.info("附件过大，压缩到50M以下", 2);
                        return [2 /*return*/];
                    }
                    if (!(compressImg && SuffixForImage.indexOf(fileSuffix) >= 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, imageCompressor(file)];
                case 1:
                    res = _a.sent();
                    if (res.status >= 0) {
                        uploadServer(res.data);
                    }
                    else {
                        // 压缩失败，直接传原图片
                        uploadServer(file);
                    }
                    return [2 /*return*/];
                case 2:
                    uploadServer(file);
                    return [2 /*return*/];
            }
        });
    }); };
    var uploadServer = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            onFileUpload && onFileUpload(file);
            return [2 /*return*/];
        });
    }); };
    // 清除附件
    var clearAttachment = function () {
        alert(React.createElement("div", { className: "tips-text" }, "\u786E\u5B9A\u5220\u9664\u9644\u4EF6\uFF1F"), "", [
            { text: "取消", onPress: function () { return console.log("取消"); } },
            {
                text: "确定",
                onPress: function () {
                    onFileDelete && onFileDelete();
                    Toast.info("附件删除成功", 2);
                }
            }
        ]);
    };
    var downloadFile = function (url) {
        window.open(url);
    };
    var previewPicture = function () {
        // 如果允许预览，则preview为true
        setViewImage(!!preview);
    };
    return (React.createElement("div", { className: "file-upload" },
        viewImage && (React.createElement(Lightbox, { wrapperClassName: "light-box", mainSrc: fileUrl, onCloseRequest: function () {
                setViewImage(false);
            } })),
        React.createElement("div", { className: "file-upload-inner" },
            suffix && (React.createElement("div", { className: "img-wrapper" }, suffix == "image" ? (React.createElement("span", { className: "icon", style: {
                    backgroundImage: "url('" + fileUrl + "')",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }, onClick: previewPicture })) : (React.createElement("i", { className: "icon" }, suffix)))),
            suffix && suffix != "image" && displayOnly && React.createElement("p", null, fileName),
            displayOnly && suffix && download && (React.createElement("span", { className: "link", onClick: function () {
                    downloadFile(fileUrl);
                } }, "\u4E0B\u8F7D\u9644\u4EF6")),
            !displayOnly && suffix && (React.createElement("div", null,
                React.createElement("span", { className: "link", onClick: clearAttachment }, "\u5220\u9664"),
                React.createElement("span", { className: "link" },
                    "\u91CD\u65B0\u4E0A\u4F20",
                    React.createElement("input", { type: "file", ref: function (i) {
                            setRefInput(i);
                        }, onChange: selectFile })))),
            !displayOnly && !suffix && (React.createElement("span", { className: "upload" },
                React.createElement("input", { type: "file", ref: function (i) {
                        setRefInput(i);
                    }, onChange: selectFile })))),
        !displayOnly && (React.createElement("div", { className: "notes" }, "\u53EF\u4E0A\u4F20\u4EE5\u4E0B\u683C\u5F0F\u7684\u9644\u4EF6\uFF1A.docx\uFF0C.doc\uFF0C.xlsx\uFF0Cxls\uFF0C.pptx\uFF0C.ppt\uFF0C.jpg\uFF0C.png\uFF0C.gif\uFF0C.jpeg\uFF0C.mp4\uFF0C.avi\uFF0C.zip\uFF0C.rar"))));
};
export default FileUpload;
//# sourceMappingURL=index.js.map