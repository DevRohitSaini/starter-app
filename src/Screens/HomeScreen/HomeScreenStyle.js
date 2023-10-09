import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import constant from '../../CommanFiles/Constant/constant';

const HomeScreenStyle = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  headerIconStyle: {
    height: 50,
    width: 50,
  },
  jobListMailContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: constant.borderColor,    
  },
 
  jobListMailContainer2: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  jobTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#292929'
  },
  jobSubTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIcon: {
    height: 17,
    width: 17,
    marginRight: 5,
  },
  applyButtonContainer: {
    padding: 10,
  },
  jobDiscriptionContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    marginTop:10,
    borderTopColor: constant.borderColor,
  },
  jobDiscriptionContainer2: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    display: constant.display,
  },
  locationIcon: {
    height: 17,
    width: 15,
    marginRight: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  modelContainer: {
    width: constant.width,
    paddingHorizontal: 20,
    marginLeft: -20,
    height: 250,
    bottom: -280,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalSubView: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  modalMainContainer: {
    margin: 20,
    flex: 1,
  },
  modalTextView: {
    flexDirection: 'row',
  },
  modalDeleteDogTextStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#646C7D',
    fontSize: 15
  },
  modalIconView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  modalIconStyle: {
    height: 30,
    width: 30,
  },
  modalButton: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButtonDirection: {
    flexDirection: 'row',
  },
  modalCustomBorderButtonView: {
    flex: 1,
    marginRight: 20,
  },
  modalCusttomButtonView: {
    flex: 1,
  },
  dropdown2BtnStyle: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderColor:'#ACB4D1',
    borderStyle:'solid',
    borderWidth:1,
    text: '#787F9C',
    
    
    
  },
  dropdown2BtnTxtStyle: {
    color: '#787F9C',
    textAlign: 'left',
  },
});

export default HomeScreenStyle;
