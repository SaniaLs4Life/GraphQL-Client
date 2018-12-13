import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'dashboard',
        }
    }
    
    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        cookies.remove('token');        
        window.location = '/signin';
    }
    render() {
        return (
                    !localStorage.getItem('token') ? 
                            <Menu
                                onClick={this.handleClick}
                                selectedKeys={[this.state.current]}
                                mode="horizontal"
                                theme="dark"
                            >
                                <Menu.Item key="signin">
                                    <Link to="/signin">                    
                                        <Icon type="login" />Sign in
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="signup">
                                    <Link to="/signup">
                                        <Icon type="logout" />Sign up
                                    </Link>
                                </Menu.Item>
                            </Menu>
                    :
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        theme="dark"
                        >
                            <Menu.Item key="dashboard">
                                <Link to="/dashboard">
                                    <Icon type="dashboard" />Dashboard
                                </Link>
                        </Menu.Item>
                        <Menu.Item key="logout">
                                <Link to="/signin" onClick={this.logout}>
                                    <Icon type="close" />Logout
                                </Link>
                        </Menu.Item>
                    </Menu>
        )
    }
}

export default Navbar;