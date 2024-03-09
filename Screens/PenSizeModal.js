import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PenSizeModal = ({handleSizeChange,openSizeModal,sizeModal,size}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={sizeModal}
        onRequestClose={() => {
            openSizeModal(false)
        }}>
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <View style={{backgroundColor:'#FFE6E6',height:'20%',borderRadius:16}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Pen Size</Text>
                        <TouchableOpacity onPress={()=>{
                            openSizeModal(false)
                        }}>
                            <AntDesign  name='closecircle' size ={20} color='black'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                    <Slider
                        style={{width: '80%', height: 40,backgroundColor:'#fff',borderRadius:40}}
                        minimumValue={2}
                        maximumValue={20}
                        minimumTrackTintColor="blue"
                        maximumTrackTintColor="#000000"
                        onSlidingComplete={(value)=>{
                            handleSizeChange(value)
                            openSizeModal(false)
                        }}
                        value={size}
                        thumbTintColor={'blue'}
                        />
                    </View>
                </View>
            </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    //flex: 1,
    //zIndex:1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PenSizeModal;