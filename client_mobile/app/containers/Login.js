import React, { Component } from 'react';
import { 
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { updateUsername, updateLogin } from '../actions.js';


const mapStateToProps = ({ loginReducer, usernameReducer }) => ({
  loginReducer,
  usernameReducer
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (username, pw) => {
    /* -----------------------
          Apply Auth here
    ----------------------- */
    if (username !== '') {
      dispatch(updateUsername(username));
      dispatch(updateLogin());
    }
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      typeInUsername: '',
      typeInPassword: ''
    }
  }

  static navigationOptions = {
    title: 'Login',
  }

  render() {
    let props = this.props;
    const { navigate } = props.navigation;
    console.log('Login props: ', props);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Memento!
        </Text>
        <Text style={styles.instructions}>
          Login or Sign up:
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(typeInUsername) => this.setState({typeInUsername})}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder={'Username'}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(typeInPassword) => this.setState({typeInPassword})}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <Button 
          title="Login"
          onPress={() => {
            props.onLoginClick(this.state.typeInUsername, this.state.typeInPassword);
          }} />
        <Button 
          title="Sign up"
          onPress={() => navigate('Signup')}  />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
