import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  homeView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    borderWidth: 0,
  },
  homeLogoView: {
    marginTop: 200,
    marginBottom: 90,
  },
  homeLogoText: {
    fontFamily: 'JosefinSansBold',
    fontSize: 70,
    textAlign: 'center',
  },
  homeText: {
    fontFamily: 'JosefinSansBold',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 15,
  },
  homeInput: {
    height: 50,
    marginTop: 25,
    marginBottom: 25,
    borderWidth: 0,
    fontSize: 50,
  },
});


const songDisplayStyles = StyleSheet.create({
  songView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    borderWidth: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songLogoView: {},
  songLogoText: {
    fontFamily: 'JosefinSansBold',
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 50,
  },
  songImageFrame: {
    backgroundColor: 'lightyellow',
    borderColor: 'black',
    width: 'auto'
  },
  songImage: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    width: 400,
    height: 400,
    marginHorizontal: 10,
  },
  songInfoView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightyellow',
    alignItems: 'center',
  },

  songTitleText: {
    textAlign: 'center',
    fontFamily: 'JosefinSansBold',
    fontSize: 30,
    marginTop: 35,
    marginBottom: 15,
    width: 400,
  },
  albumText: {
    fontFamily: 'JosefinSansBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    width: 400
  },
  songArtistsText: {
    fontFamily: 'JosefinSansMedium',
    fontSize: 20,
    textAlign: 'center',
    width: 400
  },
});

export { homeStyles, songDisplayStyles };