import styles from "./styles.module.scss"
import React from 'react'
import ThemeIcon from '../icons/ThemeIcon'



export default function ThemeSwitcher({isChecked, handleSwitch, onColor='blue', offColor}) {
    // const[onColor, setOnColor] = useState("#FAF8FF");
    // const[offColor, setOffColor] = useState("#585068");
    return (
        <div>
           <input className={styles.switchcheckbox} hidden type="checkbox" id="switch-checkbox" checked={isChecked} onChange={handleSwitch}/>
           <label className={styles.switchlabel}
           htmlFor='switch-checkbox'
           onBgColor={onColor}
           offBgColor={offColor}
           style={{backgroundColor: isChecked? onColor : offColor}}>
            <span className={styles.switchbutton}> <ThemeIcon fillColor={"#FAF8FF"} /></span>
           </label>
           
        </div>

    )
}