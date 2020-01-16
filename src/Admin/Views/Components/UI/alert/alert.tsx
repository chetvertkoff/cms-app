import React, {useContext} from 'react';
import { AlertContext } from './../../../Context/alert-context';


const Alert = () => {
    const alert = React.useContext(AlertContext)
    var classes = ["alert-modal-background"]
    
    if (alert.alert.isShow) {
        classes.push('active-modal')
    }else{
        classes = ["alert-modal-background"]
    }

    const closeAlert=():void=>{
        alert.alert.toggleAlert(false)
    }


    return (
        <div className={classes.join(" ")} onClick={closeAlert}>
            <div className="alert-modal" onClick={e=>e.stopPropagation()}>
                <i className="fa fa-times close" onClick={closeAlert}></i>
                <div className="alert-body">
                    <h2 className="message">Вы уверены ?</h2>
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={()=>{alert.delete.deletePage(true)}} >Продолжить</button>
                    <button className="btn btn-danger"  onClick={()=>{alert.alert.toggleAlert(false)}} >Отменить</button>
                </div>
            </div>
        </div>
    )
}

export default Alert;
