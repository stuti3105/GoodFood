import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage, ImageBackground, Picker} from 'react-native';
import {RadioButton, Text, Card, TextInput, Button, Snackbar } from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {onSignOut} from '../auth';

class EditProfile extends Component {
  state = {
    Name: undefined,
    Height: undefined,
    Weight: undefined,
    Gender: undefined,
    VegNonVeg: undefined,
    LifeStyle: undefined,
    Origin: undefined,
    Activities: undefined,
    Location: undefined,
    Allergies: undefined,
    Deficiencies: undefined,
    Visible: false
  };

  componentDidMount() {
    this.getData().then(result => this.setState(JSON.parse(result)));
  }

  onChangeText = (key, val) => {
    if(key === 'Height' || key === 'Weight'){
      var regexp = /^\d+\.?\d{0,2}$/
      if(val.length && !regexp.test(val))
        alert(`Please enter a valid ${key}`)
    }
    this.setState({[key]: val});
  };

  getData = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('Registration')
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };

  saveMyProfile = () => {
    AsyncStorage.setItem('Registration', JSON.stringify(this.state)).then(() => 
    this.setState({Visible:true}),
    );
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          mode={'outlined'}
          color={'#128ef2'}
          style={{
            borderRadius: 50,
            borderColor: '#128ef2',
            borderWidth: 1,
            backgroundColor: '#fff',
            marginTop: 5,
          }}
          onPress={() => this.props.toggleProfile()}>
          {'View Profile'}
        </Button>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View>
            <TextInput
              style={styles.input}
              label="Name"
              mode={'outlined'}
              theme={{colors: {primary: '#128ef2'}}}
              value={this.state.Name}
              onChangeText={val => this.onChangeText('Name', val)}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.halfInput}
                value={this.state.Height}
                mode={'outlined'}
                theme={{colors: {primary: '#128ef2'}}}
                label="Height(in meters)"
                autoCapitalize="none"
                onChangeText={val => this.onChangeText('Height', val)}
              />
              <TextInput
                style={styles.halfInput}
                label="Weight(in kgs)"
                mode={'outlined'}
                theme={{colors: {primary: '#128ef2'}}}
                value={this.state.Weight}
                autoCapitalize="none"
                onChangeText={val => this.onChangeText('Weight', val)}
              />
            </View>
            <RadioButton.Group
              onValueChange={value => this.setState({Gender: value})}
              value={this.state.Gender}>
              <View style={{flexDirection: 'row', width: 350}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 160,
                    margin: 10,
                    padding: 8,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 17}}>Male</Text>
                  <RadioButton value="Male" color={'#128ef2'} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 156,
                    margin: 10,
                    padding: 8,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 17}}>Female</Text>
                  <RadioButton value="Female" color={'#128ef2'} />
                </View>
              </View>
            </RadioButton.Group>
            <View style={[styles.input,{height:80, borderWidth:1, borderRadius:10, borderColor:'#8b8b8b'}]}>
            <Text style={{fontSize: 17,color:'#8b8b8b'}}>Type of Lifestyle</Text>
              <Picker
                selectedValue={this.state.LifeStyle}
                style={{width: '90%'}}
                mode={'dropdown'}
                prompt={'Type of Lifestyle'}
                onValueChange={(itemValue, itemIndex) =>
                  this.onChangeText('LifeStyle', itemValue)
                }>
                <Picker.Item
                  label="Physically Demanding"
                  value="Physically Demanding"
                />
                <Picker.Item label="Not Physical" value="Not Physical" />
                <Picker.Item
                  label="Sitting and Standing"
                  value="Sitting and Standing"
                />
                <Picker.Item label="Couch Potato" value="Couch Potato" />
              </Picker>
              </View>
            
            <TextInput
              style={styles.input}
              label="Origin"
              autoCapitalize="none"
              value={this.state.Origin}
              mode={'outlined'}
              theme={{colors: {primary: '#128ef2'}}}
              placeholderTextColor="white"
              multiline={true}
              onChangeText={val => this.onChangeText('Origin', val)}
            />
            <RadioButton.Group
              onValueChange={value => this.setState({VegNonVeg: value})}
              value={this.state.VegNonVeg}>
              <View style={{flexDirection: 'row', width: 350}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 100,
                    margin: 10,
                    padding: 8,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 17}}>Veg</Text>
                  <RadioButton value="Veg" color={'#128ef2'} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 100,
                    margin: 10,
                    padding: 8,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 17}}>Non-Veg</Text>
                  <RadioButton value="Non-Veg" color={'#128ef2'} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 100,
                    margin: 10,
                    padding: 8,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 17}}>Vegan</Text>
                  <RadioButton value="Vegan" color={'#128ef2'} />
                </View>
              </View>
            </RadioButton.Group>

            <TextInput
              style={[styles.input, {height: 60}]}
              label="Physical Activities(e.g., football, cricket...)"
              autoCapitalize="none"
              mode={'outlined'}
              value={this.state.Activities}
              theme={{colors: {primary: '#128ef2'}}}
              multiline={true}
              onChangeText={val => this.onChangeText('Activities', val)}
            />
            <TextInput
              style={[styles.input, {height: 60}]}
              label="Current Location(City)"
              autoCapitalize="none"
              mode={'outlined'}
              value={this.state.Location}
              theme={{colors: {primary: '#128ef2'}}}
              multiline={true}
              onChangeText={val => this.onChangeText('Location', val)}
            />
            <TextInput
              style={[styles.input, {height: 60}]}
              label="Allergies(If any)"
              multiline={true}
              value={this.state.Allergies}
              theme={{colors: {primary: '#128ef2'}}}
              mode={'outlined'}
              onChangeText={val => this.onChangeText('Allergies', val)}
            />
            <TextInput
              style={[styles.input, {height: 60}]}
              label="Deficiencies(If any)"
              multiline={true}
              value={this.state.Deficiencies}
              theme={{colors: {primary: '#128ef2'}}}
              mode={'outlined'}
              onChangeText={val => this.onChangeText('Deficiencies', val)}
            />
            <Button
              color={'#128ef2'}
              mode="outlined"
              style={{
                borderRadius: 50,
                borderColor: '#128ef2',
                borderWidth: 1,
                backgroundColor: '#fff',
                marginBottom: 5,
              }}
              onPress={() => this.saveMyProfile()}>
              {'Save Details'}
            </Button>
          </View>
        </ScrollView>
        <Snackbar
          visible={this.state.Visible}
          duration={2000}
          onDismiss={() => this.setState({Visible: false})}>
          {'Saved successfully'}
        </Snackbar>
      </View>
    );
  }
}

class MyProfile extends Component {
  state = {};

  componentDidMount() {
    this.getData().then(result => this.setState(JSON.parse(result)));
  }

  getData = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('Registration')
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };

  render() {
    let renderBMI = () => {
      let {Height, Weight} = this.state;
      return Math.round(Weight / (Height * Height));
    };
    return (
      <ScrollView>
        <View style={[styles.container, {marginTop: 50}]}>
          <View style={{alignItems: 'flex-start'}}>
            <Button
              mode="outlined"
              color={'#128ef2'}
              style={{
                borderRadius: 50,
                borderColor: '#128ef2',
                marginVertical: 5,
                borderWidth: 1,
                backgroundColor: '#fff',
              }}
              onPress={() => this.props.toggleProfile()}>
              {'Edit Profile'}
            </Button>
          </View>

          {this.state.Name ? (
            <Card.Content
              style={{
                padding: 20,
                marginBottom: 50,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              {this.state.Name && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'Name   :   ' + this.state.Name}
                </Text>
              )}
              {this.state.Gender && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'Gender   :   ' + this.state.Gender}
                </Text>
              )}
              {this.state.Height && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'Height   :   ' + this.state.Height}
                </Text>
              )}
              {this.state.Weight && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'Weight   :   ' + this.state.Weight}
                </Text>
              )}
              {this.state.Height && this.state.Weight && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'BMI   :   ' + renderBMI()}
                </Text>
              )}
              {this.state.Allergies && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'Allergies   :   ' + this.state.Allergies}
                </Text>
              )}
              {this.state.Deficiencies && (
                <Text style={{marginVertical: 5, fontSize: 20}}>
                  {'Deficiency   :   ' + this.state.Deficiencies}
                </Text>
              )}
            </Card.Content>
          ) : (
            <Card.Content
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'white',
                marginVertical: 50,
                padding: 20,
              }}>
              <Text
                style={{fontSize: 17, fontWeight: '900', marginVertical: 5}}>
                {'Please fill all the details to help us know your better'}
              </Text>
            </Card.Content>
          )}
          <View
            style={{padding: 20, backgroundColor: '#fff6e5'}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {'Category                    BMI range - kg/m2'}
            </Text>
            <Text>{'Severe Thinness	                  < 16'}</Text>
            <Text>{'Moderate Thinness	           16 - 17'}</Text>
            <Text>{'Mild Thinness	                     17 - 18.5'}</Text>
            <Text>{'Normal	                                 18.5 - 25'}</Text>
            <Text>{'Overweight      	                      25 - 30'}</Text>
            <Text>{'Obese Class I	                        30 - 35'}</Text>
            <Text>{'Obese Class II	                      35 - 40'}</Text>
            <Text>{'Obese Class III	                    > 40'}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default class Profile extends Component {
  state = {
    editProfile: false,
  };

  toggleProfile = () => this.setState({editProfile: !this.state.editProfile});

  render() {
    let {editProfile} = this.state;

    return (
      <ImageBackground
        source={require('../Drawables/profile.jpg')}
        imageStyle={{opacity: 0.3}}
        style={{height: '100%', width: '100%'}}>
        {editProfile ? (
          <EditProfile toggleProfile={this.toggleProfile} />
        ) : (
          <MyProfile toggleProfile={this.toggleProfile} />
        )}
        <Button
          mode={'outlined'}
          color={'#128ef2'}
          style={{
            borderRadius: 50,
            borderColor: '#128ef2',
            borderWidth: 1,
            backgroundColor: '#fff',
            margin: 5,
          }}
          onPress={() =>
            onSignOut().then(() => this.props.navigation.navigate('SignedOut'))
          }
        >SIGN OUT</Button>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 30,
    backgroundColor: '#ffff',
    margin: 10,
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
    borderColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  halfInput: {
    width: '40%',
    height: 30,
    backgroundColor: '#ffff',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '500',
  },
});

