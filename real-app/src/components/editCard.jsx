import { useFormik } from "formik";
import formikValidate from "../functions/formikvalidateJoi";
import { editCard } from "../services/cardsService";
import { toast } from "react-toastify";
import Joi from "joi";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useNavigate, useParams } from "react-router-dom";

const EditCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidate({
      _id: Joi.string(),
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).allow("").uri().label("Image"),
    }),

    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;
        if (bizImage) {
          body.bizImage = bizImage;
        }

        await editCard(id, body);
        toast.success("Your Card was updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/my-cards");
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader
        title="Edit Card Form"
        description="Fill out card details here "
      />
      <form
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
        method="POST"
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          label="Name"
          type="text"
          error={form.touched.bizName && form.errors.bizName}
          {...form.getFieldProps("bizName")}
        />
        <Input
          label="Description"
          type="text"
          error={form.touched.bizDescription && form.errors.bizDescription}
          {...form.getFieldProps("bizDescription")}
        />
        <Input
          label="Address"
          type="text"
          error={form.touched.bizAddress && form.errors.bizAddress}
          {...form.getFieldProps("bizAddress")}
        />
        <Input
          label="Phone"
          type="text"
          error={form.touched.bizPhone && form.errors.bizPhone}
          {...form.getFieldProps("bizPhone")}
        />
        <Input
          label="Image"
          type="text"
          error={form.touched.bizImage && form.errors.bizImage}
          {...form.getFieldProps("bizImage")}
        />

        <div className="my-4">
          <button disabled={!form.isValid} className=" btn btn-outline-primary">
            Edit your Card
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCard;
