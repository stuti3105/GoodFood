import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Snackbar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class WriteJournal extends Component {
  state = {
    Breakfast: '',
    Lunch: '',
    Dinner: '',
    Snacks: '',
    Visible: false
  };

  componentDidMount() {
    this.getData().then(result => this.setState(JSON.parse(result)));
  }

  addToJournal = dateOfTheDay => {
    debugger
    AsyncStorage.setItem(`nom_${dateOfTheDay}`, JSON.stringify(this.state)).then(() =>
      this.setState({Visible:true})
    );
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  getData = () => {
    let dateOfTheDay =
      new Date().getDate() + '  ' + monthNames[new Date().getMonth()];
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(dateOfTheDay)
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
    let dateOfTheDay =
      new Date().getDate() + '  ' + monthNames[new Date().getMonth()];

    return (
      <View style={styles.container}>
        <Button
          mode="outlined"
          color={'#128ef2'}
          style={{
            borderRadius: 50,
            borderColor: '#128ef2',
            borderWidth: 1,
            backgroundColor: '#fff',
            marginVertical: 5,
          }}
          onPress={() => this.props.showMyJournal()}>
          {'My Journal'}
        </Button>
        <Text style={{marginVertical: 5, fontSize: 25, fontWeight: 'bold'}}>
          {dateOfTheDay}
        </Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Breakfast"
          theme={{colors: {primary: '#128ef2'}}}
          autoCapitalize="none"
          placeholderTextColor="white"
          multiline={true}
          value={this.state.Breakfast}
          onChangeText={val => this.onChangeText('Breakfast', val)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Lunch"
          theme={{colors: {primary: '#128ef2'}}}
          autoCapitalize="none"
          placeholderTextColor="white"
          multiline={true}
          value={this.state.Lunch}
          onChangeText={val => this.onChangeText('Lunch', val)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Snacks"
          theme={{colors: {primary: '#128ef2'}}}
          autoCapitalize="none"
          placeholderTextColor="white"
          multiline={true}
          value={this.state.Snacks}
          onChangeText={val => this.onChangeText('Snacks', val)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Dinner"
          theme={{colors: {primary: '#128ef2'}}}
          autoCapitalize="none"
          placeholderTextColor="white"
          multiline={true}
          value={this.state.Dinner}
          onChangeText={val => this.onChangeText('Dinner', val)}
        />
        <Button
          mode="outlined"
          color={'#128ef2'}
          style={{
            borderRadius: 50,
            borderColor: '#128ef2',
            borderWidth: 1,
            backgroundColor: '#fff',
            marginVertical: 5,
          }}
          onPress={() => this.addToJournal(dateOfTheDay)}>
          {'Add to my Journal'}
        </Button>
        <Snackbar visible={this.state.Visible} duration ={2000} onDismiss={()=>this.setState({Visible:false})}>{'Successfully added to Journal'}</Snackbar>
      </View>
    );
  }
}

class Myjournal extends Component {
  state = {data: null};

  componentDidMount() {
    this.getData().then(result => this.setState({data: result}));
  }

  getData = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getAllKeys()
        .then(res => {
          if (res !== null) {
            debugger
            let data = res.filter(item => item.split('_')[0] === 'nom');
            AsyncStorage.multiGet(data).then(result => {
              if (result !== null) resolve(result);
            });
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };

  renderCards = () => {
    let {data} = this.state, emptyMessage='Oops ! Nothing to show.' ;
    return data.map(item => {
      debugger
      let title = item[0].split('_')[1],
        subtitle = JSON.parse(item[1]);
      return (
        <Card.Content
          style={{borderWidth: 1, width: '90%', backgroundColor: 'white'}}>
          <Title>{title}</Title>
          <Paragraph>
            {`Breakfast: ${
              subtitle['Breakfast'] && subtitle['Breakfast'].length > 0
                ? subtitle['Breakfast']
                : emptyMessage
            }\nLunch: ${
              subtitle['Lunch'] && subtitle['Lunch'].length > 0
                ? subtitle['Lunch']
                : emptyMessage
            }\nSnacks: ${
              subtitle['Snacks'] && subtitle['Snacks'].length > 0
                ? subtitle['Snacks']
                : emptyMessage
            }\nDinner: ${
              subtitle['Dinner'] && subtitle['Dinner'].length > 0
                ? subtitle['Dinner']
                : emptyMessage
            }`}
          </Paragraph>
        </Card.Content>
      );
    });
  };

  render() {
    debugger;
    return (
      <ScrollView>
        <View style={[styles.container, {marginTop: 50}]}>
            <Button
              color={'#128ef2'}
              onPress={() => this.props.showWriteJournal()}
              style={{
                borderRadius: 50,
                borderColor: '#128ef2',
                borderWidth: 1,
                backgroundColor: '#fff',
                marginVertical: 5,
              }}>
              {'Back'}
            </Button>
          {this.state.data && this.state.data.length ? (
            this.renderCards()
          ) : (
            <Card.Content
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'white',
                marginTop: 50,
              }}>
              <Text>{'No journals added'}</Text>
            </Card.Content>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default class NomJournal extends Component {
  state = {Myjournal: false};

  showMyJournal = () => this.setState({Myjournal: true});

  showWriteJournal = () => this.setState({Myjournal: false});

  render() {
    return (
      <ImageBackground source={require('../Drawables/journal.jpg')} imageStyle={{ opacity: 0.3 }}  style={{ height: '100%', width: '100%'}}>
    {this.state.Myjournal ? (
      <Myjournal showWriteJournal={this.showWriteJournal} />
    ) : (
      <WriteJournal showMyJournal={this.showMyJournal} />
    )}
   </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 80,
    backgroundColor: '#ffff',
    margin: 4,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
