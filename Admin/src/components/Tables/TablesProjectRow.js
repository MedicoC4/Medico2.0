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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacies, verificationPharm ,pharmEmail} from "../../redux/pharmacySlicer";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function TablesTableRow(props) {
  const { isLast } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rejectedDoctorEmail, setRejectedDoctorEmail] = useState(null); 


  const pharmacies = useSelector((state) => state.pharmacy.data);

  const fetch = async () => {
    await dispatch(fetchPharmacies());
  };

  const verific = async (email) => {
    await dispatch(verificationPharm({ email }));
    console.log("===============>Done");
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

  const setWithClick = (pharmacy) => {
    setDocEmail(pharmacy)
  }

  const takeIEmail = (email)=>{
    dispatch(pharmEmail(email))
  }

  useEffect(() => {
    fetch();
  }, [refresh]);

  return (
    <Tr>
      {Array.isArray(pharmacies) &&
        pharmacies.map((pharmacy) => (
          <Tr key={pharmacy.email}>
            <Td
              minWidth={{ sm: "250px" }}
              pl="0px"
              borderColor={borderColor}
              borderBottom={isLast ? "none" : null}
            >
              <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <NavLink to='/admin/profilePharmacy'>
              <Avatar
                  src={pharmacy?.Pharmacy?.imageUrl}
                  w="50px"
                  borderRadius="12px"
                  me="18px"
                  onClick={()=>{takeIEmail(pharmacy.email)}}

                />
              
              </NavLink>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={titleColor}
                    fontWeight="bold"
                    minWidth="100%"
                  >
                    {pharmacy?.Pharmacy?.PHname}
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    {pharmacy.email}
                  </Text>
                </Flex>
              </Flex>
            </Td>

            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
              <Flex direction="column">
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  {pharmacy.type}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {pharmacy.Pharmacy.type}
                </Text>
              </Flex>
            </Td>

            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
              <Badge
                bg={
                  pharmacy?.Pharmacy?.isverified === true
                    ? "green.400"
                    : bgStatus
                }
                color={
                  pharmacy?.Pharmacy?.isverified === true ? "white" : "white"
                }
                fontSize="16px"
                p="3px 10px"
                borderRadius="8px"
              >
                {pharmacy?.Pharmacy?.isverified === true
                  ? "Verified"
                  : "Not Verified"}
              </Badge>
            </Td>

            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                {pharmacy.createdAt}
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
                    onClick={(e) => {
                      verific(pharmacy.email);
                    }}
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
                    onClick={(e) => handleRejectClick(pharmacy.email)}
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
                Confirm
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
