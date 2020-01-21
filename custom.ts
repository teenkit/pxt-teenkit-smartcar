/**
 * Rainbow programable smart car
 * 彩虹可编程智能小车
 * 重庆润颐科技有限公司
 * www.rootbrother.com
 */
enum WHEELS {
    //% block="左轮"
    left = 0x60,
    //% block="右轮"
    right = 0x61,
    //% block="双轮"
    left_right
}

enum MOTOR_MOTION {
    //% block="自由运动"
    coast = 0,
    //% block="倒车"
    reverse = 1,
    //% block="前进"
    forward = 2,
    //% block="刹车"
    brake = 3
}
enum TURN_TYPE {
    //% block="原地左转"
    round_left,
    //% block="原地右转"
    round_right,
    //% block="行进中左转"
    forward_lef,
    //% block="行进中右转"
    forward_right,
    //% block="后退中左转"
    backward_left,
    //% block="后退中右转"
    backward_right

}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartcar {

    let Motor_speed = [0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F];

    /**
     * set reg
     */
    function setReg(dev: WHEELS, reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf.setNumber(NumberFormat.UInt8BE, 0, reg);
        buf.setNumber(NumberFormat.UInt8BE, 1, dat);
        pins.i2cWriteBuffer(dev, buf);
    }

    /**
     * get reg
     */
    function getReg8(dev: WHEELS, reg: number, format: NumberFormat): number {
        let buf = pins.createBuffer(1)
        buf.setNumber(NumberFormat.UInt8BE, 0, reg)
        pins.i2cWriteBuffer(dev, buf)
        buf = pins.i2cReadBuffer(dev, 1)
        return buf.getNumber(NumberFormat.UInt8BE, 0);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    /**
     * 设置智能小车的运动
     * 
     * @param device is the motor type
     * @param act is action the motor to take
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="设置 %dev|动作%act|速度 %speed"
    //% weight=60 blockGap=8
    //% speed.min=0 speed.max=58
    export function setMotorAction(dev: WHEELS, act: MOTOR_MOTION, speed: number): void {
        let spd = Motor_speed[speed];
        spd = spd << 2;
        spd = spd | act;

        let dat = pins.createBuffer(2);
        dat.setNumber(NumberFormat.UInt8BE, 0, 0X00);
        dat.setNumber(NumberFormat.Int8LE, 1, spd)

        switch (dev) {
            case WHEELS.left:
                pins.i2cWriteBuffer(dev, dat);
                break;
            case WHEELS.right:
                pins.i2cWriteBuffer(dev, dat);
                break;
            case WHEELS.left_right:
                pins.i2cWriteBuffer(WHEELS.left, dat);
                pins.i2cWriteBuffer(WHEELS.right, dat);
                break;
        }


    }
    /**
     * 设置智能小车的转向
     * 
     * @param device is the motor type
     * @param act is action the motor to take
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_TURN" block="转向 %t|速度 %speed"
    //% weight=60 blockGap=8
    //% speed.min=0 speed.max=58
    export function turn(t: TURN_TYPE, speed: number) {
        let buf = pins.createBuffer(4);
        buf = pins.i2cReadBuffer(WHEELS.left, 4)

        serial.writeLine("1: " + buf.getNumber(NumberFormat.Int8BE, 0));
        serial.writeLine("2: " + buf.getNumber(NumberFormat.Int8BE, 1));
        serial.writeLine("3: " + buf.getNumber(NumberFormat.Int8BE, 2));
        serial.writeLine("4: " + buf.getNumber(NumberFormat.Int8BE, 3));

        let lw = pins.createBuffer(2);
        lw.setNumber(NumberFormat.Int8LE, 0, 0x00);

        let rw = pins.createBuffer(2);
        rw.setNumber(NumberFormat.Int8LE, 0, 0x00);

        let lspd = Motor_speed[speed];
        lspd = lspd << 2;
        let rspd = Motor_speed[speed];
        rspd = rspd << 2;

        switch (t) {
            case TURN_TYPE.round_left:
                lspd = lspd | MOTOR_MOTION.reverse;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);

                rspd = rspd | MOTOR_MOTION.forward;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);

                break;
            case TURN_TYPE.round_right:
                lspd = lspd | MOTOR_MOTION.forward;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);

                rspd = rspd | MOTOR_MOTION.reverse;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);

                break;
            case TURN_TYPE.forward_lef:
                lspd = Motor_speed[1];
                lspd = lspd | MOTOR_MOTION.forward;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);

                rspd = rspd | MOTOR_MOTION.forward;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);

                break;
            case TURN_TYPE.forward_right:
                lspd = lspd | MOTOR_MOTION.forward;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);

                rspd = Motor_speed[1];
                rspd = rspd | MOTOR_MOTION.forward;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);
                break;
            case TURN_TYPE.backward_left:
                lspd = lspd | MOTOR_MOTION.reverse;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);

                rspd = Motor_speed[1];
                rspd = rspd | MOTOR_MOTION.reverse;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);
                break;
            case TURN_TYPE.backward_right:
                lspd = Motor_speed[1];
                lspd = lspd | MOTOR_MOTION.reverse;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);

                rspd = rspd | MOTOR_MOTION.reverse;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);
                break;

        }
    }
}
