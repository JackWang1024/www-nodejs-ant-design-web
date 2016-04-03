import React from 'react';
import {Row, Col, DatePicker} from 'antd';
class DatePickerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.defaultValue
    };

    componentDidMount() {
        this.props.setData(this.props.name, this.state.value);
    }

    handleChange = (value)=> {
        if(this.props.showTime){
            value = value&&(value.toLocaleDateString('zh-CN')+' ' +value.toLocaleTimeString('zh-CN'))
        }else{
            value = value && value.toLocaleDateString('zh-CN');
        }
        this.props.setData(this.props.name, value);
        this.setState({
            value: value
        });
        if (this.props.searchOnChange) {
            this.props.search();
        }
    };

    render() {
        let props = {
            format:'yyyy-MM-dd'
        };
        if(this.props.showTime){
            props = {
                showTime:true,
                format:"yyyy-MM-dd HH:mm"
            }
        }
        return (
            <Col>
                <DatePicker
                    {...props}
                    style={{width:this.props.width}}
                    value={this.state.value}
                    onChange={this.handleChange}/>
            </Col>
        );
    }
}
export default DatePickerItem;
