import { useRef, useState } from "react";
import { Alert, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ColorModal from "./ColorModal";
import PenSizeModal from "./PenSizeModal";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Sign = ({ onOK }) => {

  const[draw, setDraw] = useState(true);
  const[color, setColor] = useState('black');
  const[size, setSize] = useState(2);
  const[colorModal, setColorModal] = useState(false)
  const[sizeModal, setSizeModal] = useState(false)
  const ref = useRef();

  
  const handleOK = (signature) => {
   onOK(signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    Alert.alert('Save', 'Are you sure, Want to save?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => ref.current.readSignature()},
    ]);
  };

  const handleUndo = () => {
    ref.current.undo();
  };

  const handleRedo = () => {
    ref.current.redo();
  };

  const handleDrawErase = ()=> {
    setDraw(!draw);
    if(draw){
      ref.current.erase();
    }else{
      ref.current.draw();
    }
  }

  const handleColorChange = (color)=>{
    setColor(color);
    ref.current.changePenColor(color)
    console.log('color',color)
  } 

  const handleSizeChange = (size)=>{
    setSize(size);
    console.log('size',size)
    ref.current.changePenSize(2,size)
    
  } 

  const openColorModal =(openStae)=>{
    setColorModal(openStae);
    console.log('openStae',openStae)
  }

  const openSizeModal =(openStae)=>{
    setSizeModal(openStae);
    console.log('openStae',openStae)
  }

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}
  body,html {
    width: ${windowWidth}px; height: ${windowHeight}px;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
      <ColorModal handleColorChange={handleColorChange} openColorModal={openColorModal} colorModal={colorModal}/>
      <PenSizeModal handleSizeChange={handleSizeChange} openSizeModal={openSizeModal} sizeModal={sizeModal} size={size}/>
    <View style={styles.row}>
        <TouchableOpacity style={styles.butt}
        onPress={handleClear}>
          <AntDesign name='delete' size ={20} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butt}
        onPress={handleDrawErase}
        >
          {draw?<Entypo name='eraser' size ={20} color='#fff'/>:<Entypo name='pencil' size ={20} color='#fff'/>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.butt}
        onPress={handleRedo}>
          <Ionicons name='arrow-redo' size ={20} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butt}
        onPress={handleUndo}>
          <Ionicons name='arrow-undo' size ={20} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butt}
        onPress={()=>{openColorModal(true)}}>
          <Entypo name='colours' size ={20} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butt}
        onPress={()=>{openSizeModal(true)}}>
          <FontAwesome6 name='sliders' size ={20} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butt}
        onPress={handleConfirm}>
          <Entypo name='save' size ={20} color='#fff'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 0,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    backgroundColor:'#FF3EA5',
    paddingHorizontal:20,
    paddingVertical:2,
    borderRadius:24
  },
  butt: {
    //backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
    padding:8,
    borderRadius:16  
  }
});