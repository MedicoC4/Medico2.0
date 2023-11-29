
import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    Icon,
    Image,
    Link,
    Text,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  
  import ImageArchitect1 from "assets/img/ImageArchitect1.png";
  
  
  import Card from "components/Card/Card";
  import CardBody from "components/Card/CardBody";
  import CardHeader from "components/Card/CardHeader";
  import React, { useEffect } from "react";
  import {
    FaCube,
    FaFacebook,
    FaInstagram,
    FaPenFancy,
    FaPlus,
    FaTwitter,
  } from "react-icons/fa";
  import { useDispatch, useSelector } from "react-redux";
  import { pharmacyDetails } from "redux/pharmacySlicer";
  
  function PharmacyProfile() {
    const { colorMode } = useColorMode();
  
  
    
  
    
    const textColor = useColorModeValue("gray.700", "white");
    const iconColor = useColorModeValue("blue.500", "white");
    const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    const borderProfileColor = useColorModeValue("white", "transparent");
    const emailColor = useColorModeValue("gray.400", "gray.300");
  
    const dispatch = useDispatch()
  
    const onePharmacy =  useSelector((state)=>state.pharmacy.onePharm)
    const phEmail = useSelector((state)=>state.pharmacy.pharmaEmail)
  
    console.log('>>>>>>>>>>>' , phEmail);
  useEffect(()=>{ 
    dispatch(pharmacyDetails(phEmail))
    console.log('obj========>',onePharmacy);
  
    },[])
       
  
    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px", lg: "100px" }}>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mb='24px'
          maxH='330px'
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='blur(21px)'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='1.5px solid'
          borderColor={borderProfileColor}
          bg={bgProfile}
          p='24px'
          borderRadius='20px'>
          <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={onePharmacy.imageUrl}
              w='80px'
              h='80px'
              borderRadius='15px'
            />
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
               {onePharmacy.PHname}
              </Text>
              
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}>
  
          </Flex>
        </Flex>
  
        <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
          <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
            <CardHeader p='12px 5px' mb='12px'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Profile Information
              </Text>
            </CardHeader>
            <CardBody px='5px'>
              <Flex direction='column'>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='30px'>
                Hello, I'm {onePharmacy.PHname}, and my approach to healthcare is guided by a philosophy rooted in decisive action. 
  In the realm of pharmaceutical care, my principle is clear: when faced with uncertainty, 
  choosing not to proceed is a valid decision. It's a belief that underscores the importance of making definitive 
  choices in the best interest of patient well-being. 
  As a pharmacy, I am dedicated to providing high-quality medications and personalized service to ensure the health and well-being of our community.
`;
                </Text>
                <Flex align='center' mb='18px'>
                  <Text
                    fontSize='md'
                    color={textColor}
                    fontWeight='bold'
                    me='10px'>
                    Full Name:{''}
                  </Text>
                  <Text fontSize='md' color='gray.400' fontWeight='400'>
                    {onePharmacy.PHname}
                  </Text>
                </Flex>
                <Flex align='center' mb='18px'>
                  <Text
                    fontSize='md'
                    color={textColor}
                    fontWeight='bold'
                    me='10px'>
                    Type:{" "}
                  </Text>
                  <Text fontSize='md' color='gray.400' fontWeight='400'>
                    {onePharmacy.type}
                  </Text>
                </Flex>
                <Flex align='center' mb='18px'>
                  <Text
                    fontSize='md'
                    color={textColor}
                    fontWeight='bold'
                    me='10px'>
                    Rating:{" "}
                  </Text>
                  <Text fontSize='md' color='gray.400' fontWeight='400'>
                    {onePharmacy.rating}
                  </Text>
                </Flex>
                <Flex align='center' mb='18px'>
                  <Text
                    fontSize='md'
                    color={textColor}
                    fontWeight='bold'
                    me='10px'>
                    Location:{" "}
                  </Text>
                  <Text fontSize='md' color='gray.400' fontWeight='400'>
                    {onePharmacy.adress}
                  </Text>
                </Flex>
                <Flex align='center' mb='18px'>
                  <Text
                    fontSize='md'
                    color={textColor}
                    fontWeight='bold'
                    me='10px'>
                    Social Media:{" "}
                  </Text>
                  <Flex>
                    <Link
                      href='#'
                      color={iconColor}
                      fontSize='lg'
                      me='10px'
                      _hover={{ color: "blue.500" }}>
                      <Icon as={FaFacebook} />
                    </Link>
                    <Link
                      href='#'
                      color={iconColor}
                      fontSize='lg'
                      me='10px'
                      _hover={{ color: "blue.500" }}>
                      <Icon as={FaInstagram} />
                    </Link>
                    <Link
                      href='#'
                      color={iconColor}
                      fontSize='lg'
                      me='10px'
                      _hover={{ color: "blue.500" }}>
                      <Icon as={FaTwitter} />
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
        <Card p='16px' my='24px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Flex direction='column'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Records
              </Text>
              <Text fontSize='sm' color='gray.400' fontWeight='400'>
                All Records
              </Text>
            </Flex>
          </CardHeader>
          <CardBody px='5px'>
            <Grid
              templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
              templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
              gap='24px'>
              <Flex direction='column'>
                <Box mb='20px' position='relative' borderRadius='15px'>
                  <Image src={ImageArchitect1} borderRadius='15px' />
                  <Box
                    w='100%'
                    h='100%'
                    position='absolute'
                    top='0'
                    borderRadius='15px'
                    bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
                </Box>
                <Flex direction='column'>
                  <Text
                    fontSize='xl'
                    color={textColor}
                    fontWeight='bold'
                    mb='10px'>
                    Record Name
                  </Text>
                </Flex>
              </Flex>
              <Flex direction='column'>
               
              </Flex>
            </Grid>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  
  export default PharmacyProfile;
  