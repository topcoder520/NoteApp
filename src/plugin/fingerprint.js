//指纹验证
export function FingerprintVerification() {
    // 检查指纹验证可用性
    return new Promise((resolve, reject) => {
        FingerprintAuth.isAvailable(resultSuccess => {
            if (resultSuccess.isAvailable) {
                var config = {
                    clientId: "com.github.topcoder520_debug", // 在使用凭证加解密时是必须的，用于访问使用android key store，并且是加密的盐；
                    usename: "myUsername", // 在使用凭证加解密时是必须的，加密的盐；
                    password: "myPassword",// 加密时需要，解密时不需要
                    //token: undefined, // 加密时不需要，解密时是必须的，
                    disableBackup: false, // 是否允许用户使用缩退方案，即当指纹验证有问题时是否提供用户密码等方式验证的按钮；
                    maxAttempts: '5', // 最大重试次数，默认为5次，可以比5小
                    locale: "zh_CN", // 对话框的语言，默认是英文en_US
                    userAuthRequired: "false",
                    //encryptNoAuth: undefined,
                    dialogTitle: '指纹验证', // 对话框标题
                    dialogMessage: '请触摸指纹传感器', // 对话框的提示文字
                    dialogHint: '本次验证不会保存您的指纹信息' // 对话框的指纹图标显示的文字
                };
                FingerprintAuth.encrypt(config, rs => {
                    resolve(rs);
                }, err => {
                    reject(err);
                });
            } else {
                reject(err);
            }
        }, resultError => {
            reject(resultError);
        });
    });
}
