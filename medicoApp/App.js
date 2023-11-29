import React,{useState,useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signup,
  Welcome,
  FirstStep,
  SecondStep,
  ThirdStep,
  DoctorPdf,
  FinishSignUp,
  ProfileApp,
  Settings,
  UserProfilePage,
  PharmacyProfile,
  Promotions,
  BestSellers,
  AllMissingProducts,
  Appointment,
  AppointementClient,
  AppointementList,
  UserMapView,
  AllReviews,
  AllDoctors,
  AddRatings,
  PharProf,
  DocProfileNew,
  AppointementDoctor
} from "./screens";
import Landing from "./screens/Landing";
import UserProfile from "./screens/UserProfile";
import DocFirstStep from "./screens/docFirstStep";
import DocSecondStep from "./screens/docSecounStep";
import UpgradeDocFirstForm from "./screens/UpgradeDocFirstForm";
import MapLocation from "./screens/MapLocation";
import AllPharmacies from "./screens/AllPharmacies";
import PharmFirstStep from "./screens/PharmFirstStep";
import PharmSecondStep from "./screens/PharmSecoundStep";
import UpgradeToPharm from "./screens/UpgradeToPharm";
import AllMedicines from "./screens/AllMedecines";
import MedicineDetails from "./screens/MedecineDetails";
import UserMap from "./screens/UserMap";
import DocProfile from "./screens/DocProfile";
import { UserProvider } from "./constants/userProvier";
import PharmSecoundForm from "./screens/PharmSecoundForm";
import PharmFirstForm from "./screens/PharmFirstForm";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { AppointementList } from "../server/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token')

        // Set the initial route based on the token existence
        setInitialRoute(token ? 'Landing' : 'Login')
      } catch (error) {
        
        console.error('Error checking token:', error)   
         }
    }
    checkToken()
  }, []);


  return (
    
    
      <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={initialRoute}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddRatings"
          component={AddRatings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="docProfile"
          component={DocProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DocProfileNew"
          component={DocProfileNew}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="AllMissingProducts"
          component={AllMissingProducts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllDoctors"
          component={AllDoctors}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllReviews"
          component={AllReviews}
          options={{
            headerShown: false,
          }}
        />
<Stack.Screen
          name="Promotions"
          component={Promotions}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PharProf"
          component={PharProf}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="BestSellers"
          component={BestSellers}
          options={{
            headerShown: false,
          }}
        />

          <Stack.Screen
            name="PharmacyProfile"
            component={PharmacyProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DoctorPdf"
            component={DoctorPdf}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FinishSignUp"
            component={FinishSignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FirstStep"
            component={FirstStep}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SecondStep"
            component={SecondStep}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ThirdStep"
            component={ThirdStep}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="userProfile"
            component={UserProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="userProfilePage"
            component={UserProfilePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DocFirstStep"
            component={DocFirstStep}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DocSecoundStep"
            component={DocSecondStep}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="upgradeToDoc"
            component={UpgradeDocFirstForm}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="map"
            component={MapLocation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllPharmacies"
            component={AllPharmacies}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllMedicines"
            component={AllMedicines}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MedicineDetails"
            component={MedicineDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pharmFirstStep"
            component={PharmFirstStep}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PharmSecoundStep"
            component={PharmSecondStep}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpgradeToPharm"
            component={UpgradeToPharm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PharmSecoundForm"
            component={PharmSecoundForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PharmFirstForm"
            component={PharmFirstForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="appointement"
            component={Appointment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="appointmentClient"
            component={AppointementClient}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="appointmentDoctor"
            component={AppointementDoctor}
            options={{
              headerShown: false,
            }}
          />
       
      </Stack.Navigator>

      
    </NavigationContainer>
    </Provider>
  );
}
