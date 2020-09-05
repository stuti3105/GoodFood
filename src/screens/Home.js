import React, {Component} from 'react';
import {View, ImageBackground, FlatList, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {Text, Card, Button, Title, Paragraph, Avatar, IconButton} from 'react-native-paper';
import Video from 'react-native-video';


class LikeButton extends Component{
  state = {
    like: false
  }

  render(){
      return(
      <IconButton
      icon="star"
      color={this.state.like ? '#e60': "#727272" }
      size={30}
      onPress={() => this.setState({ like: !this.state.like})}
    />)
  }
}

export default class Home extends Component {

  render() {

    const DATA = [
      // {
      //   id: '303',
      //   location: require('../Drawables/210.png'),
      //   url: 'https://youtu.be/xyQY8a-ng6g',
      //   title: 'How The Food You Eat Affects Your Brain',
      //   style: {height: 180, width: 335},
      // },
      {
        id: '209',
        location: require('../Drawables/209.jpeg'),
        style: { height: 420, width: 300 },
      },
      // {
      //   id: '401',
      //   location: require('../Drawables/401.png'),
      //   link:
      //     'https://www.today.com/food/what-plant-based-meat-here-are-our-top-10-product-t160303',
      //   title: 'Vegetable Based Meat',
      //   paragraph:
      //     '"Burgers," made with plant-based ingredients instead of animal meat, have become a hot item in grocery stores and even fast food chains.',
      //   style: {height: 180, width: 335},
      // },
      {
        id: '201',
        location: require('../Drawables/201.jpg'),
        style: { height: 420, width: 300 },
      },
      {
        id: '206',
        location: require('../Drawables/206.jpg'),
        style: { height: 420, width: 340},
      },
      {
        id: '203',
        location: require('../Drawables/203.jpeg'),
        style: { height: 420, width: 300 },
      },
      {
        id: '210',
        location: require('../Drawables/210.png'),
        style: { height: 420, width: 300 },
      },
      {
        id: '213',
        location: require('../Drawables/213.jpg'),
        style: { height: 420, width: 300 },
      },
      {
        id: '212',
        location: require('../Drawables/212.jpg'),
        style: {height: 400, width: 300},
      },
      {
        id: '106',
        location: require('../Drawables/106.png'),
        style: { height: 420, width: 300 },
      },

      {
        id: '207',
        location: require('../Drawables/207.jpg'),
        style: { height: 420, width: 300 },
      },
     
      {
        id: '208',
        location: require('../Drawables/208.jpg'),
        style: { height: 420, width: 300 },
      },

     
      {
        id: '102',
        location: require('../Drawables/102.jpg'),
        style: {height: 230, width: 340},
      },

      {
        id: '202',
        location: require('../Drawables/202.jpg'),
        style: {height: 470, width: 260},
      },
      
     

      {
        id: '211',
        location: require('../Drawables/211.jpg'),
        style: {height: 340, width: 335},
      },
      
      {
        id: '205',
        location: require('../Drawables/205.jpeg'),
        style: {height: 420, width: 300},
      },

      {
        id: '108',
        location: require('../Drawables/108.png'),
        style: {height: 360, width: 335},
      },
     
      {
        id: '204',
        location: require('../Drawables/204.jpg'),
        style: {height: 300, width: 340},
        // title: 'First Item',
      },
    ];

    return (
      <View>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              margin: 5,
              color: '#128ef2',
            }}>
            PARKY
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* <View style={{height: 390, width: 390}}>
            <Button onPress={() => Linking.openURL("https://youtu.be/swigQ10SL_w")}>press</Button>
            <Video
              source={require('../Drawables/food.mov')} // Can be a URL or a localfile.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              onBuffer={()=> alert(' 11')}                // Callback when remote video is buffering
              onEnd={() => alert('22 ')}                      // Callback when playback finishes
              onError={(e) => alert(e)}               // Callback when video cannot be loaded
              // style={styles.backgroundVideo}
            />
          </View> */}
          <FlatList
            data={DATA}
            style={{marginBottom: 100}}
            renderItem={({item}) => (
              <Card
                key={item.id}
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  borderWidth: 1,
                  borderColor: '#8b8b8b',
                  backgroundColor: '#fff6e7',
                }}>
                {item.url ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      alignContent: 'center',
                      borderWidth: 1,
                      backgroundColor: '#ffff',
                    }}
                    onPress={() => Linking.openURL(item.url)}>
                    <Card.Cover
                      source={item.location}
                      style={{...item.style}}
                    />
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      alignContent: 'center',
                    }}>
                    <Card.Cover
                      source={item.location}
                      style={{...item.style, flex: 1}}
                    />
                  </View>
                )}
                {item.title && <Title>{item.title}</Title>}
                {item.paragraph && <Paragraph >{item.paragraph}</Paragraph>}
                {item.link && (
                  <TouchableOpacity onPress={() => Linking.openURL(item.link).catch((err) => alert('Couldn\'t open url, please try again later'))}>
                    <Title style={{ color:'#128ef2', fontSize:15,lineHeight:15,}}>{item.link}</Title>
                  </TouchableOpacity>
                )}
                <Card.Actions style={{justifyContent: 'flex-end', padding:0}}>
                  <LikeButton />
                </Card.Actions>
              </Card>
            )}
            keyExtractor={item => item.id}
            // extraData={selected}
          />
        </View>
      </View>
    );
  }
}
