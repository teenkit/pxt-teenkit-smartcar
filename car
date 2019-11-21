



/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartCar {
    //iic address of write device
    let DEV_W_ADR = 0x2D;
    //iic address of device read
    let DEV_R_ADR = 0x2D;
    //状态地址
    let left_motor_status = 0x00;
    let right_motor_status = 0x01;
    let left_motor_speed = 0x02;
    let right_motor_speed = 0x03;

/**
 * user query car device status options
 */
    export enum  options{
        //% block="左轮状态"
        LMS = 0x00,
        //% block="右轮状态"
        RMS = 0x01,
        //% block="左轮当前速度"
        LMSPD = 0x02,
        //% block="右轮当前速度"
        RMSPD = 0x03
    }
    /**
     * TODO: 在此处描述您的函数
     * @param value 在此处描述”值“, eg: 5
     */
    //% block
    export function getStatus(opt: options): number {
        return getReg(opt);
        
    }

    /**
     * set reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DEV_W_ADR, buf);
    }

    /**
     * get reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DEV_R_ADR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DEV_R_ADR, NumberFormat.UInt8BE);
    }

}
