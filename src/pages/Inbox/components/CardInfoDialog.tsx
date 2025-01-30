import { Field, Formik, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  openCardInfo: boolean;
  setOpenCardInfo: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  setFormData: (values: any) => void;
}

const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .min(16, "Card number must be at least 16 digits"),
  cardHolder: Yup.string().required("Card holder's name is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string()
    .required("Zip code is required")
    .matches(/^\d{5}$/, "Zip code must be 5 digits"),
});

const CardInfoDialog = (props: Props) => {
  const { openCardInfo, setOpenCardInfo, formData, setFormData } = props;

  const handleClose = () => {
    setOpenCardInfo(false);
  };

  const handleContinue = (values: any) => {
    console.log("Form data", values);
    setFormData({
      ...formData,
      ...values,
    });
    setOpenCardInfo(false);
  };

  return (
    <>
      <Dialog
        open={openCardInfo}
        onClose={handleClose}
        sx={{
          zIndex: 99999,
          "& .MuiPaper-root": {
            backgroundColor: "#131313",
            padding: "0 24px",
            marginTop: "0px",
            marginBottom: "0px",
            border: "1px solid #242424",
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        <Formik
          initialValues={{
            cardNumber: "4242424242424242",
            cardHolder: "John Doe",
            addressLine1: "123 Test Street",
            addressLine2: "Apt 4B",
            country: "United States",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
          }}
          validationSchema={PaymentSchema}
          onSubmit={handleContinue}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex overflow-hidden">
              <div className="flex flex-col overflow-hidden relative">
                <div className="sticky z-10 top-0 pt-6 bg-darkGray">
                  <div className="flex justify-between text-[20px] leading-3 text-softGray items-center font-semibold">
                    <h2>Enter Card info</h2>
                    <div
                      onClick={handleClose}
                      className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
                    >
                      <CancelIcon className="w-2 h-2" />
                    </div>
                  </div>
                  <div
                    onClick={handleClose}
                    className="pb-3 pt-2 text-softGray w-max cursor-pointer"
                  >
                    <IoArrowBack className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex flex-col pb-1 pr-1 overflow-y-auto custom-dropdown">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[18px] font-semibold text-softGray">
                      Card Info
                    </h2>
                    <div className="relative">
                      <Field
                        name="cardNumber"
                        placeholder="Card Number"
                        className="w-full hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                      <ErrorMessage
                        name="cardNumber"
                        component="div"
                        className="text-darkRed text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        name="cardHolder"
                        placeholder="Card Holder"
                        className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 w-full text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                      <ErrorMessage
                        name="cardHolder"
                        component="div"
                        className="text-darkRed text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-[18px] pt-2 font-semibold text-softGray">
                      Billing Address
                    </h2>

                    <div>
                      <Field
                        name="addressLine1"
                        placeholder="Address Line 1"
                        className="w-full hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                      <ErrorMessage
                        name="addressLine1"
                        component="div"
                        className="text-darkRed text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        name="addressLine2"
                        placeholder="Address Line 2 (optional)"
                        className="w-full hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                    </div>

                    <div className="relative">
                      <Field
                        name="country"
                        placeholder="Country"
                        className="w-full hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                      <IoIosArrowDown className="absolute right-3 top-3 text-dimGray" />
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-darkRed text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        name="city"
                        placeholder="City"
                        className="w-full text-sm hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-darkRed text-xs mt-1"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-1/4">
                        <Field
                          name="state"
                          placeholder="State"
                          className="w-full text-sm hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-darkRed text-xs mt-1"
                        />
                      </div>

                      <div className="w-3/4">
                        <Field
                          name="zip"
                          placeholder="Zip Code"
                          className="w-full text-sm hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                        />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="text-darkRed text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 pb-7 pt-2 flex bg-darkGray">
                  <button
                    type="submit"
                    className="bg-limeGreen text-sm text-jetBlack font-semibold py-3 px-2 rounded-full w-full"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CardInfoDialog;
