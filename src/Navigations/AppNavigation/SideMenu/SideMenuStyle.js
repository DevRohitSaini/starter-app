import { StyleSheet } from 'react-native';
import Constant from '../../../CommanFiles/Constant/constant';
// import {scale, verticalScale} from '../../../constants/scale';
// import {COLORS, SIZES} from '../../../constants/theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    //  marginHorizontal: 15,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  profilePicture: {
    width: (Constant.width / 100) * 15,
    height: (Constant.width / 100) * 15,
    backgroundColor: Constant.secondaryGray
  },
  userRatingAndEarningInfo: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 67,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  drawerItemSection: {
    marginHorizontal: 20,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  drawerItemSection1: {
    // marginHorizontal: scale(20),
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  focusedColor: {
    color: Constant.primaryGreen,
  },
  unfocusedColor: {
    color: Constant.primaryGreen,
  },
  logOutContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    // borderTopColor: 'black',
    // borderTopWidth: 1,
  },
  Icon24: {
    width: 24,
    height: 24,
  },
});

export default style;