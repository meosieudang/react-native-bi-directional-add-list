/**
* Demo for the BiDirectionalAddList component.
* @author Kole Nunley
* @date November 9, 2018
*/
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import BiDirectionalAddList from './lib';
import CustomListItem from './CustomListItem';
export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
    };
    this.loadMoreBelow = this.loadMoreBelow.bind(this);
    this.loadMoreAbove = this.loadMoreAbove.bind(this);
    this.addToTop = this.addToTop.bind(this);
    this.addToBottom = this.addToBottom.bind(this);
    this.getNumberAddedToTop = this.getNumberAddedToTop.bind(this);
    this.nextKey = 0;
  }

  componentDidMount(){
    this.loadMoreBelow(50);
  }

  createItem(){
    let key = this.nextKey; this.nextKey++;
    let color = ITEM_COLORS[Math.floor(Math.random()*ITEM_COLORS.length)];
    let height = ITEM_HEIGHTS[Math.floor(Math.random()*ITEM_HEIGHTS.length)];
    return {key, height, color};
  }

  loadMoreBelow(amount=5){
    let items = this.state.items
    for(let i = 0; i < amount; i++){
      items.push(this.createItem());
    }
    this.setState({items});
  }

  loadMoreAbove(amount=5){
    let items = this.state.items;
    for(let i = 0; i < amount; i++){
      items.unshift(this.createItem());
    }
    this.numberAddedToTop = amount;
    this.setState({items});
  }

  addToTop(){
    let items = this.state.items;
    items.unshift(this.createItem());
    this.numberAddedToTop = 1;
    this.setState({items});
  }

  addToBottom(){
    let items = this.state.items;
    items.push(this.createItem());
    this.setState({items});
  }

  getNumberAddedToTop(){
    let n = this.numberAddedToTop || 0;
    this.numberAddedToTop = 0;
    return n;
  }


  render() {
    return (
      <View style={styles.container}>
        <BiDirectionalAddList
          style={{flex: 1}}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index)=> item.key}
          data={this.state.items}
          renderItem={(data)=> <CustomListItem data={data}/>}
          onEndReached={this.loadMoreBelow}
          minScrollPositionToMaintain={0}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={25}
          initialNumToRender={8}
          scrollEventThrottle={16}
          getNumberAddedToTop={this.getNumberAddedToTop}/>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolbarButton} onPress={()=> this.loadMoreAbove(2)}>
            <Text style={styles.toolbarButtonText}>Add Top</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton} onPress={this.addToBottom}>
            <Text style={styles.toolbarButtonText}>Add Bottom</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const ITEM_COLORS = ["#4527A0", "#283593", "#1565C0", "#0277BD", "#00838F",
"#00695C", "#2E7D32", "#FFEB3B", "#EF6C00", "#4E342E", "#424242", "#C62828"];
const ITEM_HEIGHTS = [50, 75, 100, 125, 150];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    minHeight: '100%',
  },
  toolbar: {
    width: '100%',
    height: '10%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  toolbarButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  toolbarButtonText: {
    color: '#000',
    fontSize: 16,
    opacity: .81
  }
});
