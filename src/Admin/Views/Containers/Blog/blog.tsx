import React, { Component } from 'react'
import Title from './../common/title/title';

export default class Blog extends Component {
    render() {
        return (
            <div>
                <Title title={'Блог'} classN={"fa-newspaper-o"} />
                <p>Blog</p>
            </div>
        )
    }
}
