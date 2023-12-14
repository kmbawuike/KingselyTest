import React, { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import { addSectorValidation } from '../validators/user'
import { useFormik } from 'formik'
import { addSector } from '../services'
import { NotificationTypes, notify } from '../helpers'
import LoadingIndicator from './LoadingIndicator'

type AddSectorProps = {
  open: boolean
  close: () => void
}
export default function AddSector({ open, close }: AddSectorProps) {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {name: ""},
    validationSchema: addSectorValidation,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res =  await addSector(values)
        if (res) {
          setLoading(false)
          formik.resetForm()
          notify(`Sector added successfully`, NotificationTypes.Success)
          close()
        }
      } catch (error) {
        setLoading(false)
        notify("Something went wrong! Please try again later", NotificationTypes.Error)
      }
    },
  });
  return (
    <Modal open={open} close={close} title="Add Sector">
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="mb-4 space-y-4">
        <Input name='name' label='Name' formik={formik} onChange={formik.handleChange} value={formik.values.name} />
        </div>
        <Button type='submit' title='Submit' />
      </form>
      {loading && <LoadingIndicator />}
      </Modal>
  )
}
