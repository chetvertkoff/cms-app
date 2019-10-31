import React from 'react';
import { IProps } from 'Admin/Views/Types';

export default class Preloader extends React.Component<IProps>{
    state={
        count:0.0,
        className:''
    }
    
    componentDidMount(){
        const classes = ['pace']
        const timer = setInterval(()=>{
            if(this.state.count==100 || !this.props.loading){
                clearInterval(timer)
                this.setState({
                    count: 100
                })
                return setTimeout(() => {
                    delete classes[1]
                    classes.push('pace-inactive')
                    this.setState({
                        className: classes.join(' ')
                    })
                    return false
                }, 500);
            }
            this.setState({
                count: this.state.count+0.1
            })
            if(classes.find(item=>item=='pace-active') != 'pace-active'){
                classes.push('pace-active')
            }
            this.setState({
                className: classes.join(' ')
            })
        },10)
    }   

    render(){
        return (
            <div className={this.state.className}>
                <div className="pace-progress" style={{"transform": `translate3d(${this.state.count}%, 0px, 0px)`}}></div>
                <div className="pace-activity"></div>
            </div>
        );
    }
}
