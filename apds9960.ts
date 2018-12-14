
let DEBUG = 0;
/* APDS-9960 I2C address */
let APDS9960_I2C_ADDR = 0x39

/* Gesture parameters */
let GESTURE_THRESHOLD_OUT = 35
let GESTURE_SENSITIVITY_1 = 40
let GESTURE_SENSITIVITY_2 = 20

/* Error code for returned values */
let ERROR = 0xFF

/* Acceptable device IDs */
let APDS9960_ID_1 = 0xAB
let APDS9960_ID_2 = 0x9C

/* Misc parameters */
let FIFO_PAUSE_TIME = 30      // Wait period (ms) between FIFO reads

/* APDS-9960 register addresses */
let APDS9960_ENABLE = 0x80
let APDS9960_ATIME = 0x81
let APDS9960_WTIME = 0x83
let APDS9960_AILTL = 0x84
let APDS9960_AILTH = 0x85
let APDS9960_AIHTL = 0x86
let APDS9960_AIHTH = 0x87
let APDS9960_PILT = 0x89
let APDS9960_PIHT = 0x8B
let APDS9960_PERS = 0x8C
let APDS9960_CONFIG1 = 0x8D
let APDS9960_PPULSE = 0x8E
let APDS9960_CONTROL = 0x8F
let APDS9960_CONFIG2 = 0x90
let APDS9960_ID = 0x92
let APDS9960_STATUS = 0x93
let APDS9960_CDATAL = 0x94
let APDS9960_CDATAH = 0x95
let APDS9960_RDATAL = 0x96
let APDS9960_RDATAH = 0x97
let APDS9960_GDATAL = 0x98
let APDS9960_GDATAH = 0x99
let APDS9960_BDATAL = 0x9A
let APDS9960_BDATAH = 0x9B
let APDS9960_PDATA = 0x9C
let APDS9960_POFFSET_UR = 0x9D
let APDS9960_POFFSET_DL = 0x9E
let APDS9960_CONFIG3 = 0x9F
let APDS9960_GPENTH = 0xA0
let APDS9960_GEXTH = 0xA1
let APDS9960_GCONF1 = 0xA2
let APDS9960_GCONF2 = 0xA3
let APDS9960_GOFFSET_U = 0xA4
let APDS9960_GOFFSET_D = 0xA5
let APDS9960_GOFFSET_L = 0xA7
let APDS9960_GOFFSET_R = 0xA9
let APDS9960_GPULSE = 0xA6
let APDS9960_GCONF3 = 0xAA
let APDS9960_GCONF4 = 0xAB
let APDS9960_GFLVL = 0xAE
let APDS9960_GSTATUS = 0xAF
let APDS9960_IFORCE = 0xE4
let APDS9960_PICLEAR = 0xE5
let APDS9960_CICLEAR = 0xE6
let APDS9960_AICLEAR = 0xE7
let APDS9960_GFIFO_U = 0xFC
let APDS9960_GFIFO_D = 0xFD
let APDS9960_GFIFO_L = 0xFE
let APDS9960_GFIFO_R = 0xFF

/* Bit fields */
let APDS9960_PON = 0b00000001
let APDS9960_AEN = 0b00000010
let APDS9960_PEN = 0b00000100
let APDS9960_WEN = 0b00001000
let APSD9960_AIEN = 0b00010000
let APDS9960_PIEN = 0b00100000
let APDS9960_GEN = 0b01000000
let APDS9960_GVALID = 0b00000001

/* On/Off definitions */
let OFF = 0
let ON = 1

/* Acceptable parameters for setMode */
let POWER = 0
let AMBIENT_LIGHT = 1
let PROXIMITY = 2
let WAIT = 3
let AMBIENT_LIGHT_INT = 4
let PROXIMITY_INT = 5
let GESTURE = 6
let ALL = 7

/* LED Drive values */
let LED_DRIVE_100MA = 0
let LED_DRIVE_50MA = 1
let LED_DRIVE_25MA = 2
let LED_DRIVE_12_5MA = 3

/* Proximity Gain (PGAIN) values */
let PGAIN_1X = 0
let PGAIN_2X = 1
let PGAIN_4X = 2
let PGAIN_8X = 3

/* ALS Gain (AGAIN) values */
let AGAIN_1X = 0
let AGAIN_4X = 1
let AGAIN_16X = 2
let AGAIN_64X = 3

/* Gesture Gain (GGAIN) values */
let GGAIN_1X = 0
let GGAIN_2X = 1
let GGAIN_4X = 2
let GGAIN_8X = 3

/* LED Boost values */
let LED_BOOST_100 = 0
let LED_BOOST_150 = 1
let LED_BOOST_200 = 2
let LED_BOOST_300 = 3

/* Gesture wait time values */
let GWTIME_0MS = 0
let GWTIME_2_8MS = 1
let GWTIME_5_6MS = 2
let GWTIME_8_4MS = 3
let GWTIME_14_0MS = 4
let GWTIME_22_4MS = 5
let GWTIME_30_8MS = 6
let GWTIME_39_2MS = 7

/* Default values */
let DEFAULT_ATIME = 219     // 103ms
let DEFAULT_WTIME = 246     // 27ms
let DEFAULT_PROX_PPULSE = 0x87    // 16us, 8 pulses
let DEFAULT_GESTURE_PPULSE = 0x89    // 16us, 10 pulses
let DEFAULT_POFFSET_UR = 0       // 0 offset
let DEFAULT_POFFSET_DL = 0       // 0 offset      
let DEFAULT_CONFIG1 = 0x60    // No 12x wait (WTIME) factor
let DEFAULT_LDRIVE = LED_DRIVE_100MA
let DEFAULT_PGAIN = PGAIN_4X
let DEFAULT_AGAIN = AGAIN_4X
let DEFAULT_PILT = 0       // Low proximity threshold
let DEFAULT_PIHT = 50      // High proximity threshold
let DEFAULT_AILT = 0xFFFF  // Force interrupt for calibration
let DEFAULT_AIHT = 0
let DEFAULT_PERS = 0x11    // 2 consecutive prox or ALS for int.
let DEFAULT_CONFIG2 = 0x01    // No saturation interrupts or LED boost  
let DEFAULT_CONFIG3 = 0       // Enable all photodiodes, no SAI
let DEFAULT_GPENTH = 40      // Threshold for entering gesture mode
let DEFAULT_GEXTH = 30      // Threshold for exiting gesture mode    
let DEFAULT_GCONF1 = 0x40    // 4 gesture events for int., 1 for exit
let DEFAULT_GGAIN = GGAIN_4X
let DEFAULT_GLDRIVE = LED_DRIVE_100MA
let DEFAULT_GWTIME = GWTIME_2_8MS
let DEFAULT_GOFFSET = 0       // No offset scaling for gesture mode
let DEFAULT_GPULSE = 0xC9    // 32us, 10 pulses
let DEFAULT_GCONF3 = 0       // All photodiodes active during gesture
let DEFAULT_GIEN = 0       // Disable gesture interrupts




/* Direction definitions */
enum DIR {
    DIR_NONE,
    DIR_LEFT,
    DIR_RIGHT,
    DIR_UP,
    DIR_DOWN,
    DIR_NEAR,
    DIR_FAR,
    DIR_ALL
}

/* State definitions */
enum STATE {
    NA_STATE,
    NEAR_STATE,
    FAR_STATE,
    ALL_STATE
}



let gesture_ud_delta: number;
let gesture_lr_delta: number;
let gesture_ud_count: number;
let gesture_lr_count: number;
let gesture_near_count: number;
let gesture_far_count: number;
let gesture_state: number;
let gesture_motion: number;

/**
 * zjwl Gestures
 */
enum ZjwlGesture {
    //% block=None
    None = 0,
    //% block=Right
    Right = 1,
    //% block=Left
    Left = 2,
    //% block=Up
    Up = 3,
    //% block=Down
    Down = 4,
    //% block=Forward
    Forward = 5,
    //% block=Backward
    Backward = 6,
    //% block=Clockwise
    Clockwise = 7,
    //% block=Anticlockwise
    Anticlockwise = 8,
    //% block=Wave
    Wave = 9
}

/**
 * Functions to operate Grove module.
 */
//% weight=10 color=#9F79EE icon="\uf108" block="姿势传感器"
namespace ZjwlGesture9960 {

    const gestureEventId = 3100;
    let lastGesture = ZjwlGesture.None;
    /**
     * Do something when a gesture is detected by Grove - Gesture
     * @param gesture type of gesture to detect
     * @param handler code to run
     */
    //% blockId=grove_gesture_create_event block="on Gesture|%gesture"
    export function onGesture(gesture: ZjwlGesture , handler: Action) {
        control.onEvent(gestureEventId, gesture, handler);
        let apds9960 = new APDS9960();
        apds9960.init();
        control.inBackground(() => {
            while(true) {
                const gesture = apds9960.read();
                    if (gesture != lastGesture) {
                        lastGesture = gesture;
                        control.raiseEvent(gestureEventId, lastGesture);
                    }
                    basic.pause(1600);
                }
            })
    }

    /* Container for gesture data */

    export class gesture_data_type {

        
        u_data: Buffer;
        d_data: Buffer;
        l_data: Buffer;
        r_data: Buffer;
        index: number;
        total_gestures: number;
        in_threshold: number;
        out_threshold: number;

    }

    let gesture_data = new gesture_data_type;
    
    let data_buf: Buffer = pins.createBuffer(128);
    

    export class APDS9960 {

        private APDS9960ReadReg(addr: number): number {
            let buf: Buffer = pins.createBuffer(1);
            buf[0] = addr;
            pins.i2cWriteBuffer(0x39, buf, false);
            buf = pins.i2cReadBuffer(0x39, 1, false);
            return buf[0];
        }

        private APDS9960WriteReg(addr: number, cmd: number) {
            let buf: Buffer = pins.createBuffer(2);

            buf[0] = addr;
            buf[1] = cmd;

            pins.i2cWriteBuffer(0x39, buf, false);
        }
        

        /**
         * @brief Reads a block (array) of bytes from the I2C device and register
         *
         * @param[in] reg the register to read from
         * @param[out] val pointer to the beginning of the data
         * @param[in] len number of bytes to read
         * @return Number of bytes read. -1 on read error.
         */
        private APDS9960ReadRegBlock (addr: number, len:number):number {
            let i: number = 0;
            let y: number = 0;
            
            for (let i = 0; i < len; i=i+4) { 
                
                data_buf[i] = this.readi2c(0xFc);
                data_buf[i+1] = this.readi2c(0xFd);
                data_buf[i+2] = this.readi2c(0xFe);
                data_buf[i + 3] = this.readi2c(0xFf);
                basic.pause(10);
                if (DEBUG) {
                    
                    serial.writeLine(data_buf[i].toString() + " ; "
                                    +data_buf[i+1].toString() + " ; "
                                    +data_buf[i+2].toString() + " ; "
                                    +data_buf[i+3].toString() + " ; "  );
                }    
            }

        
            return len;
        }

        private getMode(): number {
            let enable_value: number;

            /* Read current ENABLE register */
            enable_value = this.APDS9960ReadReg(APDS9960_ENABLE);
            return enable_value;
        }

        private setMode(mode: number, enable: number) {
            let reg_val: number;
            /* Read current ENABLE register */
            reg_val = this.getMode();
            /* Change bit(s) in ENABLE register */
            enable = enable & 0x01;
            if (mode >= 0 && mode <= 6) {
                if (enable) {
                    reg_val |= (1 << mode);
                } else {
                    reg_val &= ~(1 << mode);
                }
            } else if (mode == ALL) {
                if (enable) {
                    reg_val = 0x7F;
                } else {
                    reg_val = 0x00;
                }
            }

            /* Write value back to ENABLE register */
            this.APDS9960WriteReg(APDS9960_ENABLE, reg_val);
        }

        /**
         * @brief Sets the gain of the photodiode during gesture mode
         *
         * Value    Gain
         *   0       1x
         *   1       2x
         *   2       4x
         *   3       8x
         *
         * @param[in] gain the value for the photodiode gain
         * @return True if operation successful. False otherwise.
         */
        private setGestureGain(gain: number) {
            let val: number;

            /* Read value from GCONF2 register */
            val = this.APDS9960ReadReg(APDS9960_GCONF2);

            /* Set bits in register to given value */
            gain &= 0b00000011;
            gain = gain << 5;
            val &= 0b10011111;
            val |= gain;

            /* Write register value back into GCONF2 register */
            this.APDS9960WriteReg(APDS9960_GCONF2, val);
        }

        /**
		 * @brief Sets the LED drive current during gesture mode
		 *
		 * Value    LED Current
		 *   0        100 mA
		 *   1         50 mA
		 *   2         25 mA
		 *   3         12.5 mA
		 *
		 * @param[in] drive the value for the LED drive current
		 * @return True if operation successful. False otherwise.
		 */
        private setGestureLEDDrive(drive: number) {
            let val: number;

            /* Read value from GCONF2 register */
            val = this.APDS9960ReadReg(APDS9960_GCONF2);

            /* Set bits in register to given value */
            drive &= 0b00000011;
            drive = drive << 3;
            val &= 0b11100111;
            val |= drive;

            /* Write register value back into GCONF2 register */
            this.APDS9960WriteReg(APDS9960_GCONF2, val);
        }

        /**
		 * @brief Sets the LED current boost value
		 *
		 * Value  Boost Current
		 *   0        100%
		 *   1        150%
		 *   2        200%
		 *   3        300%
		 *
		 * @param[in] drive the value (0-3) for current boost (100-300%)
		 * @return True if operation successful. False otherwise.
		 */
        private setLEDBoost(boost: number) {
            let val: number;

            /* Read value from CONFIG2 register */
            val = this.APDS9960ReadReg(APDS9960_CONFIG2);

            /* Set bits in register to given value */
            boost &= 0b00000011;
            boost = boost << 4;
            val &= 0b11001111;
            val |= boost;

            /* Write register value back into CONFIG2 register */
            this.APDS9960WriteReg(APDS9960_CONFIG2, val);
        }

        /**
		 * @brief Sets the time in low power mode between gesture detections
		 *
		 * Value    Wait time
		 *   0          0 ms
		 *   1          2.8 ms
		 *   2          5.6 ms
		 *   3          8.4 ms
		 *   4         14.0 ms
		 *   5         22.4 ms
		 *   6         30.8 ms
		 *   7         39.2 ms
		 *
		 * @param[in] the value for the wait time
		 * @return True if operation successful. False otherwise.
		 */
        private setGestureWaitTime(time: number) {
            let val: number;

            /* Read value from GCONF2 register */
            val = this.APDS9960ReadReg(APDS9960_GCONF2);

            /* Set bits in register to given value */
            time &= 0b00000111;
            val &= 0b11111000;
            val |= time;

            /* Write register value back into GCONF2 register */
            this.APDS9960WriteReg(APDS9960_GCONF2, val);
        }

        /**
		 * @brief Turns gesture-related interrupts on or off
		 *
		 * @param[in] enable 1 to enable interrupts, 0 to turn them off
		 * @return True if operation successful. False otherwise.
		 */
        private setGestureIntEnable(enable: number) {
            let val: number;

            /* Read value from GCONF4 register */
            val = this.APDS9960ReadReg(APDS9960_GCONF4);

            /* Set bits in register to given value */
            enable &= 0b00000001;
            enable = enable << 1;
            val &= 0b11111101;
            val |= enable;

            /* Write register value back into GCONF4 register */
            this.APDS9960WriteReg(APDS9960_GCONF4, val);
        }

        /**
         * @brief Resets all the parameters in the gesture data member
         */
        private resetGestureParameters() {

            gesture_data.index = 0;
            gesture_data.total_gestures = 0;

            gesture_ud_delta = 0;
            gesture_lr_delta = 0;

            gesture_ud_count = 0;
            gesture_lr_count = 0;

            gesture_near_count = 0;
            gesture_far_count = 0;

            gesture_state = 0;
            gesture_motion = DIR.DIR_NONE;

        }

        /**
		 * @brief Tells the state machine to either enter or exit gesture state machine
		 *
		 * @param[in] mode 1 to enter gesture state machine, 0 to exit.
		 * @return True if operation successful. False otherwise.
		 */
        private setGestureMode(mode: number) {
            let val: number;

            /* Read value from GCONF4 register */
            val = this.APDS9960ReadReg(APDS9960_GCONF4);

            /* Set bits in register to given value */
            mode &= 0b00000001;
            val &= 0b11111110;
            val |= mode;

            /* Write register value back into GCONF4 register */
            this.APDS9960WriteReg(APDS9960_GCONF4, val);
        }

        /**
		 * Turn the APDS-9960 on
		 *
		 * @return True if operation successful. False otherwise.
		 */
        private enablePower() {
            this.setMode(POWER, 1);
        }

        /**
		 * @brief Starts the gesture recognition engine on the APDS-9960
		 *
		 * @param[in] interrupts true to enable hardware external interrupt on gesture
		 * @return True if engine enabled correctly. False on error.
		 */
        private enableGestureSensor(interrupts: boolean) {

            /* Enable gesture mode
            Set ENABLE to 0 (power off)
            Set WTIME to 0xFF
            Set AUX to LED_BOOST_300
            Enable PON, WEN, PEN, GEN in ENABLE 
            */
            this.resetGestureParameters(); 
            this.APDS9960WriteReg(APDS9960_WTIME, 0xFF);  
            this.APDS9960WriteReg(APDS9960_PPULSE, DEFAULT_GESTURE_PPULSE);
            this.setLEDBoost(LED_BOOST_300);
            if (interrupts) {
                this.setGestureIntEnable(1);
            } else {
                this.setGestureIntEnable(0);
            }
            this.setGestureMode(1);
            this.enablePower();
            this.setMode(WAIT, 1)
            this.setMode(PROXIMITY, 1);
            this.setMode(GESTURE, 1); 
        }

        private pads9960_init() {

            let aa = this.APDS9960ReadReg(0X92);
            if (aa == 0xAB) {
                this.APDS9960WriteReg(APDS9960_GPENTH, DEFAULT_GPENTH);//0x28
                this.APDS9960WriteReg(APDS9960_GEXTH, DEFAULT_GEXTH);//0x1e
                this.APDS9960WriteReg(APDS9960_GCONF1, DEFAULT_GCONF1);//0x40
                this.setGestureGain(DEFAULT_GGAIN);//0x41
                this.setGestureLEDDrive(DEFAULT_GLDRIVE);
                this.setGestureWaitTime(DEFAULT_GWTIME);
                this.APDS9960WriteReg(APDS9960_GOFFSET_U, DEFAULT_GOFFSET);
                this.APDS9960WriteReg(APDS9960_GOFFSET_D, DEFAULT_GOFFSET);
                this.APDS9960WriteReg(APDS9960_GOFFSET_L, DEFAULT_GOFFSET);
                this.APDS9960WriteReg(APDS9960_GOFFSET_R, DEFAULT_GOFFSET);
                this.APDS9960WriteReg(APDS9960_GPULSE, DEFAULT_GPULSE);//0xc9
                this.APDS9960WriteReg(APDS9960_GCONF3, DEFAULT_GCONF3);//00
                this.setGestureIntEnable(DEFAULT_GIEN);   
            }

            if (0) { 
                /* Gesture config register dump */
                let reg:number=0x00;
                let val:number=0x00;
                
                for(reg = 0x80; reg <= 0xAF; reg++) {
                    if ((reg != 0x82) &&
                        (reg != 0x8A) && 
                        (reg != 0x91) && 
                        (reg != 0xA8) && 
                        (reg != 0xAC) && 
                        (reg != 0xAD) )
                    {
                        val = this.APDS9960ReadReg(reg);
                        serial.writeLine(reg+": 0x"+val);
                    }
                }

                for(reg = 0xE4; reg <= 0xE7; reg++) {
                    val = this.APDS9960ReadReg(reg);
                    serial.writeLine(reg+": 0x"+val);
                }
                
            }
           // serial.writeLine("init sensor finish");
        }

        /**
         * @brief Determines if there is a gesture available for reading
         *
         * @return True if gesture available. False otherwise.
         */
        private isGestureAvailable(): boolean {
            let val: number;

            /* Read value from GSTATUS register */
            val = this.APDS9960ReadReg(APDS9960_GSTATUS);
            /* Shift and mask out GVALID bit */
            val &= APDS9960_GVALID;

            /* Return true/false based on GVALID bit */
            if (val == 1) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * @brief Processes the raw gesture data to determine swipe direction
         *
         * @return True if near or far state seen. False otherwise.
         */
        private processGestureData():boolean{
            let u_first: number = 0;
            let d_first: number = 0;
            let l_first: number = 0;
            let r_first : number= 0;
            let u_last: number = 0;
            let d_last : number= 0;
            let l_last: number = 0;
            let r_last: number = 0;
            let ud_ratio_first: number;
            let lr_ratio_first: number;
            let ud_ratio_last: number;
            let lr_ratio_last: number;
            let ud_delta: number;
            let lr_delta: number;
            let i: number;

            /* If we have less than 4 total gestures, that's not enough */
            if( gesture_data.total_gestures <= 4 ) {
                return false;
            }
            
            /* Check to make sure our data isn't out of bounds */
            if( (gesture_data.total_gestures <= 32) && (gesture_data.total_gestures > 0) ) {
                
                /* Find the first value in U/D/L/R above the threshold */
                for( i = 0; i < gesture_data.total_gestures; i++ ) {
                    if( (gesture_data.u_data[i] > GESTURE_THRESHOLD_OUT) &&
                        (gesture_data.d_data[i] > GESTURE_THRESHOLD_OUT) &&
                        (gesture_data.l_data[i] > GESTURE_THRESHOLD_OUT) &&
                        (gesture_data.r_data[i] > GESTURE_THRESHOLD_OUT) ) {
                        
                        u_first = gesture_data.u_data[i];
                        d_first = gesture_data.d_data[i];
                        l_first = gesture_data.l_data[i];
                        r_first = gesture_data.r_data[i];
                        break;
                    }
                }
        
                /* If one of the _first values is 0, then there is no good data */
                if( (u_first == 0) || (d_first == 0) || (l_first == 0) || (r_first == 0) ) {
                    
                    return false;
                }
                /* Find the last value in U/D/L/R above the threshold */
                for (i = gesture_data.total_gestures - 1; i >= 0; i--) {
                    

                    if( (gesture_data.u_data[i] > GESTURE_THRESHOLD_OUT) &&
                        (gesture_data.d_data[i] > GESTURE_THRESHOLD_OUT) &&
                        (gesture_data.l_data[i] > GESTURE_THRESHOLD_OUT) &&
                        (gesture_data.r_data[i] > GESTURE_THRESHOLD_OUT) ) {
                        
                        u_last = gesture_data.u_data[i];
                        d_last = gesture_data.d_data[i];
                        l_last = gesture_data.l_data[i];
                        r_last = gesture_data.r_data[i];
                        break;
                    }
                }
            }
    
            /* Calculate the first vs. last ratio of up/down and left/right */
            ud_ratio_first = ((u_first - d_first) * 100) / (u_first + d_first);
            lr_ratio_first = ((l_first - r_first) * 100) / (l_first + r_first);
            ud_ratio_last = ((u_last - d_last) * 100) / (u_last + d_last);
            lr_ratio_last = ((l_last - r_last) * 100) / (l_last + r_last);
            if (ud_ratio_first==0&&lr_ratio_first==0&&ud_ratio_last==0&&lr_ratio_last==0) { 

                //this.pads9960_init();
               // this.enableGestureSensor(false);
            }
            if (DEBUG) { 
                serial.writeLine("first Values: " + "U:" + u_first
                + " D:" + d_first
                + " L:" + l_first
                + " R:" + r_first);
                serial.writeLine("Last Values: " + "U:" + u_last
                + " D:" + d_last
                + " L:" + l_last
                + " R:" + r_last);
                serial.writeLine("Ratios: " + "UD Fi:" + ud_ratio_first
                + " UD La:" + ud_ratio_last
                + " LR Fi:" + lr_ratio_first
                + " LR La:" + lr_ratio_last);
                
            }

            /* Determine the difference between the first and last ratios */
            ud_delta = ud_ratio_last - ud_ratio_first;
            lr_delta = lr_ratio_last - lr_ratio_first;
            if (DEBUG) { 
                serial.writeLine("Deltas: "+"UD: "+ud_delta+" LR: "+lr_delta);
            }

            /* Accumulate the UD and LR delta values */
            gesture_ud_delta += ud_delta;
            gesture_lr_delta += lr_delta;
            if (DEBUG) { 

                serial.writeLine("Accumulations: "+"UD: "+gesture_ud_delta+" LR: "+gesture_lr_delta);
            }
            /* Determine U/D gesture */
            if( gesture_ud_delta >= GESTURE_SENSITIVITY_1 ) {
                gesture_ud_count = 1;
            } else if( gesture_ud_delta <= -GESTURE_SENSITIVITY_1 ) {
                gesture_ud_count = -1;
            } else {
                gesture_ud_count = 0;
            }
            
            /* Determine L/R gesture */
            if( gesture_lr_delta >= GESTURE_SENSITIVITY_1 ) {
                gesture_lr_count = 1;
            } else if( gesture_lr_delta <= -GESTURE_SENSITIVITY_1 ) {
                gesture_lr_count = -1;
            } else {
                gesture_lr_count = 0;
            }
    
            /* Determine Near/Far gesture */
            if( (gesture_ud_count == 0) && (gesture_lr_count == 0) ) {
                if( (Math.abs(ud_delta) < GESTURE_SENSITIVITY_2) && (Math.abs(lr_delta) < GESTURE_SENSITIVITY_2) ) {
                    
                    if( (ud_delta == 0) && (lr_delta == 0) ) {
                        gesture_near_count++;
                    } else if( (ud_delta != 0) || (lr_delta != 0) ) {
                        gesture_far_count++;
                    }
                    
                    if( (gesture_near_count >= 10) && (gesture_far_count >= 2) ) {
                        if( (ud_delta == 0) && (lr_delta == 0) ) {
                            gesture_state = STATE.NEAR_STATE;
                        } else if( (ud_delta != 0) && (lr_delta != 0) ) {
                            gesture_state = STATE.FAR_STATE;
                        }
                        return true;
                    }
                }
            } else {
                if( (Math.abs(ud_delta) < GESTURE_SENSITIVITY_2) && (Math.abs(lr_delta) < GESTURE_SENSITIVITY_2) ) {
                        
                    if( (ud_delta == 0) && (lr_delta == 0) ) {
                        gesture_near_count++;
                    }
                    
                    if( gesture_near_count >= 10 ) {
                        gesture_ud_count = 0;
                        gesture_lr_count = 0;
                        gesture_ud_delta = 0;
                        gesture_lr_delta = 0;
                    }
                }
            }

            if (DEBUG) { 

                serial.writeLine("UD_CT: " + gesture_ud_count + " LR_CT: " + gesture_lr_count + " NEAR_CT: " + gesture_near_count
                    + " FAR_CT: " + gesture_far_count);
                   
            }
       
            return true;
        }

        /**
         * @brief Determines swipe direction or near/far state
         *
         * @return True if near/far event. False otherwise.
         */
        private decodeGesture(): boolean {
            
       
           //("gesture_state"+gesture_state);
           // serial.writeLine("gesture_ud_count: "+gesture_ud_count+" ; "+"gesture_lr_count: "+gesture_lr_count);
            /* Return if near or far event is detected */
            if( gesture_state == STATE.NEAR_STATE ) {
                gesture_motion = DIR.DIR_NEAR;
                return true;
            } else if ( gesture_state == STATE.FAR_STATE ) {
                gesture_motion = DIR.DIR_FAR;
                return true;
            }
            
            /* Determine swipe direction */
            if( (gesture_ud_count == -1) && (gesture_lr_count == 0) ) {
                gesture_motion = DIR.DIR_UP;
            } else if( (gesture_ud_count == 1) && (gesture_lr_count == 0) ) {
                gesture_motion = DIR.DIR_DOWN;
            } else if( (gesture_ud_count == 0) && (gesture_lr_count == 1) ) {
                gesture_motion = DIR.DIR_RIGHT;
            } else if( (gesture_ud_count == 0) && (gesture_lr_count == -1) ) {
                gesture_motion = DIR.DIR_LEFT;
            } else if( (gesture_ud_count == -1) && (gesture_lr_count == 1) ) {
                if( Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta) ) {
                    gesture_motion = DIR.DIR_UP;
                } else {
                    gesture_motion = DIR.DIR_RIGHT;
                }
            } else if( (gesture_ud_count == 1) && (gesture_lr_count == -1) ) {
                if( Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta) ) {
                    gesture_motion = DIR.DIR_DOWN;
                } else {
                    gesture_motion = DIR.DIR_LEFT;
                }
            } else if( (gesture_ud_count == -1) && (gesture_lr_count == -1) ) {
                if( Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta) ) {
                    gesture_motion = DIR.DIR_UP;
                } else {
                    gesture_motion = DIR.DIR_LEFT;
                }
            } else if( (gesture_ud_count == 1) && (gesture_lr_count == 1) ) {
                if( Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta) ) {
                    gesture_motion = DIR.DIR_DOWN;
                } else {
                    gesture_motion = DIR.DIR_RIGHT;
                }
            } else {
                return false;
            }
            
            return true;
        }
        /**
         * @brief Processes a gesture event and returns best guessed gesture
         *
         * @return Number corresponding to gesture. -1 on error.
         */
        private readGesture(): number {
            let fifo_level: number = 0;
            let bytes_read: number = 0;
            let fifo_data: number[] = [];
            let gstatus: number;
            let motion: number;
            let i: number;
            //this.resetGestureParameters();
            gesture_data.d_data = pins.createBuffer(32);
            gesture_data.u_data = pins.createBuffer(32);
            gesture_data.l_data = pins.createBuffer(32);
            gesture_data.r_data = pins.createBuffer(32);
           //("read sensor start");
            /* Make sure that power and gesture is on and data is valid */
            if (!this.isGestureAvailable() || !(this.getMode() & 0b01000001)) {
                return DIR.DIR_NONE;
            }

            /* Keep looping as long as gesture data is valid */
            while (1) {
                basic.pause(30);
                /* Get the contents of the STATUS register. Is data still valid? */
                gstatus = this.APDS9960ReadReg(APDS9960_GSTATUS);
                /* If we have valid data, read in FIFO */
                if ((gstatus & APDS9960_GVALID) == APDS9960_GVALID) {
                    /* Read the current FIFO level */
                    fifo_level = this.APDS9960ReadReg(APDS9960_GFLVL);

                    if (DEBUG) {
                        
                        serial.writeLine("FIFO Level: "+fifo_level);
                    }
                       
                    /* If there's stuff in the FIFO, read it into our data block */
                    if (fifo_level > 0) {
                        bytes_read = this.APDS9960ReadRegBlock(APDS9960_GFIFO_U,
                            (fifo_level * 4));
                          // bytes_read = this.APDS9960ReadRegBlock(APDS9960_GFIFO_U,fifo_level );


                        for (let i = 0; i < bytes_read;i++) { 

                            fifo_data[i] = data_buf[i];
                        }
   
                        if (0) {
                            
                            serial.writeLine("FIFO Dump: ");
                            for ( i = 0; i < bytes_read; i++ ) {
                                serial.writeLine("NO. "+i+" : "+fifo_data[i]); 
                            }
                            serial.writeLine("FIFO END");
            
                        }
                                  
                
                        if (bytes_read >= 4) {
                            for (let ii = 0; ii < bytes_read; ii=ii+4) {
                                gesture_data.u_data[gesture_data.index] = fifo_data[ii + 0];
                                gesture_data.d_data[gesture_data.index] = fifo_data[ii + 1];
                                gesture_data.l_data[gesture_data.index] = fifo_data[ii + 2];
                                gesture_data.r_data[gesture_data.index] = fifo_data[ii + 3];
                                gesture_data.index++;
                                gesture_data.total_gestures++;
                            }

                            if (0) {
                                
                                serial.writeLine("Up Data: ");
                                for ( i = 0; i < gesture_data.total_gestures; i++ ) {
                                    serial.writeLine(gesture_data.u_data[i].toString());
                                }
                                serial.writeLine("Up END");
                            }
                           

                            /* Filter and process gesture data. Decode near/far state */
                            if (this.processGestureData()) {
                                if (this.decodeGesture()) {

                                    motion = gesture_motion;
                                   
                                    if (DEBUG) {
                                       
                                        serial.writeLine("gesture_motion: " + gesture_motion.toString());
                                    }
                                    this.resetGestureParameters();
                                    return motion;
                                }
                            }
                            /* Reset data */
                            gesture_data.index = 0;
                            gesture_data.total_gestures = 0;
                        }

                    }

                }
                else {
                    /* Determine best guessed gesture and clean up */
                    basic.pause(30);
                    this.decodeGesture();
                    motion = gesture_motion;
                    if (DEBUG) {
                        
                        serial.writeLine("END: ");
                        serial.writeLine("gesture_motion"+gesture_motion);
                    }
            
                    this.resetGestureParameters();
                    return motion;
                }

            }

            motion = gesture_motion;
            return motion;
        }

        /**
         * Create a new driver of Grove - Gesture
         */
        //% blockId=grove_gesture_init block="%strip|initiate the Grove - Gesture"
        //% advanced=true
        init() {
            this.pads9960_init();
            this.enableGestureSensor(false);
            if (0) {
                /* Gesture config register dump */
                let reg: number = 0x00;
                let val: number = 0x00;
                
                for (reg = 0x80; reg <= 0xAF; reg++) {
                    if ((reg != 0x82) &&
                        (reg != 0x8A) &&
                        (reg != 0x91) &&
                        (reg != 0xA8) &&
                        (reg != 0xAC) &&
                        (reg != 0xAD)) {
                        val = this.APDS9960ReadReg(reg);
                        serial.writeLine(reg + ": 0x" + val);
                    }
                }
    
                for (reg = 0xE4; reg <= 0xE7; reg++) {
                    val = this.APDS9960ReadReg(reg);
                    serial.writeLine(reg + ": 0x" + val);
                }
                
            }
        }
        

        /**
         * Detect and recognize the gestures from Grove - Gesture
         */
        //% blockId=grove_gesture_read block="%strip|get gesture"
        //% advanced=true
        read(): number {
            let data = 0, result = 0;

            switch (this.readGesture()) {

                
                case DIR.DIR_UP:
                    //serial.writeLine("gseture: " + "UP");
                    result = ZjwlGesture.Up;
                    break;
                case DIR.DIR_DOWN:
                   // serial.writeLine("gseture: " + "DPWN");
                    result = ZjwlGesture.Down;
                    break;
                case DIR.DIR_LEFT:
                    //serial.writeLine("gseture: " + "LEFT");
                    result = ZjwlGesture.Left;
                    break;
                case DIR.DIR_RIGHT:
                   // serial.writeLine("gseture: " + "RIGHT");
                    result = ZjwlGesture.Right;
                    break;
                case DIR.DIR_NEAR:
                   // serial.writeLine("gseture: " + "NEAR");
                    result = ZjwlGesture.Forward;
                    break;
                case DIR.DIR_FAR:
                   // serial.writeLine("gseture: " + "FAR");
                    result = ZjwlGesture.Backward;
                    break;
                default:

            }
           // serial.writeLine("start gseture: ");
            return result;
        }


        readi2c(addr:number): number {
       
            return this.APDS9960ReadReg(addr);
        
        }
    }
}
