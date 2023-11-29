import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, verificationDoc , docIdd} from "../../redux/doctorSlicer";
import axios from "axios";
import { NavLink } from "react-router-dom";

function TablesTableRow(props) {
  const { isLast } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [docId , setDocId] = useState(0)
  

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rejectedDoctorEmail, setRejectedDoctorEmail] = useState(null);
  // const [data, setData] = useState([])
  
  const doctors = useSelector((state) => state.doctor.data);

  // console.log(data.data);
// console.log(doctors);

  const fetch = async() => {
    await dispatch(fetchDoctors());
    
  };

  // const feching = async() => {
  //   try {
  //     const res = await axios.get('http://localhost:1128/api/doctor/getAll')
  //     setData(res)
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // useEffect(() => {
  //   feching()
  // }, [])

  const verific =async (email) => {
  const data =  await dispatch(verificationDoc({ email }));
  // console.log("this is data", data);
   
    setRefresh((prevRefresh) => !prevRefresh); 
  };
  const handleRejectClick = (email) => {
    setRejectedDoctorEmail(email);
    setShowConfirmationModal(true);
  };

  const handleConfirmReject = () => {
   
    verific(rejectedDoctorEmail);
    setShowConfirmationModal(false);
  };

  const handleCancelReject = () => {
    setShowConfirmationModal(false);
  };
  const setWithClick = (doctor) => {
    setDocId(doctor);
  };

  const takeId = (id)=>{
    dispatch(docIdd(id))
  }

  const idd = useSelector((state)=>state.doctor.docId)
  console.log('=======================>' , idd);

  useEffect(() => {
    fetch();
  }, [refresh]);
  return (
    <Tr>
      {Array.isArray(doctors) && doctors.map((doctor) => (
        <Tr key={doctor.email}>
          <Td
            minWidth={{ sm: "250px" }}
            pl="0px"
            borderColor={borderColor}
            borderBottom={isLast ? "none" : null}
          >
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <NavLink to='/admin/profile'>
              <Avatar
                src={doctor?.Doctor?.imageUrl}
                w="50px"
                borderRadius="12px"
                me="18px"
                onClick={()=>{takeId(doctor.email) ; }}
  
              />
              </NavLink>
              <Flex direction="column">
                <Text
                  fontSize="md"
                  color={titleColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {doctor?.Doctor?.fullname}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {doctor.email}
                </Text>
              </Flex>
            </Flex>
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Flex direction="column">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                {doctor.type}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {"subdomain"}
              </Text>
            </Flex>
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Badge
              bg={
                doctor?.Doctor?.isverified === true
                  ? "green.400"
                  : bgStatus
              }
              color={doctor?.Doctor?.isverified === true ? "white" : "white"}
              fontSize="16px"
              p="3px 10px"
              borderRadius="8px"
            >
              {doctor?.Doctor?.isverified === true
                ? "Verified"
                : "Not Verified"}
            </Badge>
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {doctor.createdAt}
            </Text>
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Button p="0px" bg="transparent" variant="no-effects">
              <Td
                style={{
                  display: "flex",
                  gap: "2rem",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {verific(doctor.email)}}
                  style={{
                    backgroundColor: "#22C55E",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 2rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={(e) => handleRejectClick(doctor.email)}
                  className="reject-button"
                  style={{
                    backgroundColor: "#FF5630",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 2rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </Td>
            </Button>
          </Td>
        </Tr>
      ))}
       {showConfirmationModal && (
        <Modal isOpen={showConfirmationModal} onClose={handleCancelReject}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to reject this doctor?
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleConfirmReject}>
                Reject
              </Button>
              <Button onClick={handleCancelReject}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        )}
    </Tr>
  );
}

export default TablesTableRow;
