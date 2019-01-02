/**
 *
 * @authors WangYe wangjacker@163.com
 * @date    2019-01-02 09:49:32
 * @version $Id$
 */

class CalculateFormula {
    countDecimals(num) {
        let len = 0;
        try {
            num = Number(num);
            let str = num.toString().toUpperCase();
            if (str.split('E').length === 2) {
                let isDecimal = false;
                if (str.split('.').length === 2) {
                    str = str.split('.')[1];
                    if (parseInt(str.split('E')[0]) !== 0) {
                        isDecimal = true;
                    }
                }
                let x = str.split('E');
                if (isDecimal) {
                    len = x[0].length;
                }
                len -= parseInt(x[1]);
            } else if (str.split('.').length === 2) {
                if (parseInt(str.split('.')[1]) !== 0) {
                    len = str.split('.')[1].length;
                }
            }
        } catch (e) {
            throw e;
        } finally {
            if (isNaN(len) || len < 0) {
                len = 0;
            }
            return len;
        }
    }
    // 将小数转为整数
    convertToInt(num) {
        num = Number(num);
        let newNum = num;
        let times = this.countDecimals(num);
        let temp_num = num.toString().toUpperCase();
        if (temp_num.split('E').length === 2) {
            newNum = Math.round(num * Math.pow(10, times));
        } else {
            newNum = Number(temp_num.replace(".", ""));
        }
        return newNum;
    }
    // 确认计算结果
    getCorrectResult(type, num1, num2, result) {
        let temp_result = 0;
        switch (type) {
            case "add":
                temp_result = num1 + num2;
                break;
            case "sub":
                temp_result = num1 - num2;
                break;
            case "div":
                temp_result = num1 / num2;
                break;
            case "mul":
                temp_result = num1 * num2;
                break;
        }
        if (Math.abs(result - temp_result) > 1) {
            return temp_result;
        }
        return result;
    }
    // 两个浮点数相加
    accAdd(num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        let dec1, dec2, times;
        try {
            dec1 = this.countDecimals(num1) + 1;
        } catch (e) {
            dec1 = 0;
        }
        try {
            dec2 = this.countDecimals(num2) + 1;
        } catch (e) {
            dec2 = 0;
        }
        times = Math.pow(10, Math.max(dec1, dec2));
        let result = (this.accMul(num1, times) + this.accMul(num2, times)) / times;
        return this.getCorrectResult("add", num1, num2, result);
    }
    // 两个浮点数相乘
    accMul(num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        let times = 0,
            s1 = num1.toString(),
            s2 = num2.toString();
        try {
            times += this.countDecimals(s1);
        } catch (e) {}
        try {
            times += this.countDecimals(s2);
        } catch (e) {}
        let result = this.convertToInt(s1) * this.convertToInt(s2) / Math.pow(10, times);
        return this.getCorrectResult("mul", num1, num2, result);
    }
    // 两个浮点数相减
    accSub(num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        let dec1, dec2, times;
        try {
            dec1 = this.countDecimals(num1) + 1;
        } catch (e) {
            dec1 = 0;
        }
        try {
            dec2 = this.countDecimals(num2) + 1;
        } catch (e) {
            dec2 = 0;
        }
        times = Math.pow(10, Math.max(dec1, dec2));
        let result = Number((this.accMul(num1, times) - this.accMul(num2, times)) / times);
        return this.getCorrectResult("sub", num1, num2, result);
    }
    accDiv(num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        let t1 = 0,
            t2 = 0,
            dec1, dec2;
        try {
            t1 = this.countDecimals(num1);
        } catch (e) {}
        try {
            t2 = this.countDecimals(num2);
        } catch (e) {}
        dec1 = this.convertToInt(num1);
        dec2 = this.convertToInt(num2);
        let result = this.accMul((dec1 / dec2), Math.pow(10, t2 - t1));
        return this.getCorrectResult("div", num1, num2, result);
    }

}
export const Calculate = new CalculateFormula();
