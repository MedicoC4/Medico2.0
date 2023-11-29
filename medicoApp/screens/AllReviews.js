import { StyleSheet, Text, View,ImageBackground,ScrollView,Dimensions,TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import COLORS from '../constants/colors'
import ReviewCardDoctor from '../components/ReviewCardDoctor'
import { useDispatch, useSelector } from 'react-redux'
import {fetchDocReviews} from '../redux/docReviewSlicer'
import {fetchUserNames} from '../redux/userSlicer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationBar from '../components/NavigationBar'


const {width,height}=Dimensions.get('window')
const AllReviews = ({navigation,route}) => {
    const {data} = route.params
    const dispatch=useDispatch()
    const reviews=useSelector((state)=>state.docRev.data)
    const userN=useSelector((state)=>state.user.data)

    console.log('hello',userN);

    console.log("those are the reviews",reviews)
    const [client,setClient]=useState(0)



    const fetchReviews= ()=>{
        dispatch(fetchDocReviews(data.id))
    }

    useEffect(() => {
        fetchReviews()
      }, []);
  return (
    <View style={{
        backgroundColor:'white',
    }}>
      <View style={{
            width:width*1,
            height:height*0.48
        }}>
        <ImageBackground
        source={require('../assets/doctoura.jpg')}
        resizeMode="cover"
        style={{width:width*1,
            height:height*0.37,
            flex: 1,
            justifyContent: 'flex-start',
            padding:30
        
        
        
        }}
        >
            <View style={{
                display:"flex",
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
            <TouchableOpacity
            style={{
                backgroundColor:COLORS.white,
            width:width*0.1,
            height:height*0.05,
            borderRadius:200,
            alignItems:'center',
            justifyContent:'center'
            }}>
                <Image
                source={require('../assets/arrowback.png')}
                style={{
                    width:width*0.07,
                    height:height*0.02
                }}
                />
            </TouchableOpacity>

            <TouchableOpacity
            style={{
                backgroundColor:COLORS.white,
            width:width*0.1,
            height:height*0.05,
            borderRadius:200,
            alignItems:'center',
            justifyContent:'center'
            }}>
                <Image
                source={require('../assets/menu.png')}
                style={{
                    width:width*0.08,
                    height:height*0.03
                }}
                />
            </TouchableOpacity>
            </View>
            <View
            style={{
                width:width*0.9,
                height:height*0.15,
                backgroundColor:COLORS.white,
                position:'absolute',
                top:230,
                left:20,
                borderRadius:20,
                elevation: 10,
                justifyContent:'space-between',
    shadowColor: 'grey',
    display:'flex',
    flexDirection:'row'
            }}
            >
                <View 
                style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:20
                }}
                >
                    <View style={{
                        paddingTop:12,
                        paddingLeft:27
                    }}>
                    <Text style={{
                        fontSize:20,
                        fontWeight:600
                    }}>Dr. {data.fullname}</Text>
                    <Text style={{
                        fontSize:15,
                        fontWeight:400,
                        color:COLORS.grey
                    }}>Doctor Speciality</Text>
                    </View>

                    <View style={{
                        display:'flex',
                        flexDirection:'row'
                    }}>
                        <View style={{
                            paddingLeft:20,
                            display:"flex",
                            flexDirection:'row',
                            alignItems:'center',
                            gap:10
                        }}>
                            <Image 
                            source={require('../assets/approved.png')}
                            style={{width:width*0.065,
                            height:height*0.031}}
                            />
                            <Text style={{
                                fontWeight:600
                            }}>Doctor</Text>
                        </View>
                        <View style={{
                            paddingLeft:20,
                            display:"flex",
                            flexDirection:'row',
                            alignItems:'center',
                            gap:10
                        }}>
                            <Image 
                            source={require('../assets/gps.png')}
                            style={{width:width*0.062,
                            height:height*0.030}}
                            />
                            <Text style={{
                                fontWeight:600
                            }}>1.6 km</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={{
                    display:'flex',
                    flexDirection:'column',
                    padding:20,
                    alignItems:'center',
                    gap:12
                }}>
                    <View style={{
                        backgroundColor:COLORS.primary,
                        width:width*0.15,
                        alignItems:'center',
                        justifyContent:'center',
                        height:height*0.07,
                        borderRadius:20
                    }}>
                        <Text style={{
                            color:COLORS.white,
                            fontSize:20,
                            fontWeight:600
                        }}>5.0</Text>
                    </View>
                    <Text style={{
                        color:COLORS.grey,
                        fontWeight:600
                    }}>150 Reviews</Text>
                </View>


            </View>




        </ImageBackground>

        </View>

        
                <View style={{
                    flexGrow:1,
                    height:height*0.47
                }}>
        <ScrollView contentContainerStyle={{
            paddingLeft:20,
            paddingRight:20,
            width:width*1,
            // height:height*2.5,
            alignItems:'center',
            gap:10,
            paddingTop:2,
            paddingBottom:2,
            flexGrow:1
            
        }}>
            {reviews.reverse().map((review, index) => (
          <ReviewCardDoctor key={review.id} review={review} />
        ))}
        </ScrollView>
        </View>
        <NavigationBar/>
    </View>
  )
}

export default AllReviews

const styles = StyleSheet.create({})