import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { UserType } from '../type'
import Button from './Button'
import Input from './Input'
import MultiSelect from './MultiSelect'
import { addUserValidation } from '../validators/user'
import { useFormik } from 'formik'
import { addUser, editUser, getSectors } from '../services'
import Checkbox from './Checkbox'
import { NotificationTypes, notify } from '../helpers'
import LoadingIndicator from './LoadingIndicator'

type AddUserProps = {
  open: boolean
  close: () => void
  user?: UserType
  cleanUpFunc: () => void
}
const initialValues = {
  name: "",
  sectors: [],
  agreedToTerms: false,
  allSectors: [],
}
export default function AddUser({ open, close, user, cleanUpFunc }: AddUserProps) {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: addUserValidation,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = !!user ? await editUser({...values, id: user.id}) : await addUser(values)
        if (res) {
          setLoading(false)
          formik.resetForm()
          cleanUpFunc()
          notify(`User ${!!user ? 'updated' : "added"} successfully`, NotificationTypes.Success)
          close()
        }
      } catch (error) {
        setLoading(false)
    notify("Something went wrong! Please try again later", NotificationTypes.Error)

      }
    },
  });

  useEffect(() => {
    async function init() {
      setLoading(true)
      const res = await getSectors()
      if (res && res?.data?.data) {
        setLoading(false)
        formik.setFieldValue("allSectors", res?.data?.data?.map((s: any) => ({ label: s?.name, value: s?.id })))
      }
    }
    if (!!user) {
      formik.setValues((v: any) => ({ ...v, name: user.name, agreedToTerms: user.agreedToTerms, sectors: user.sectors.map((u) => ({ label: u?.name, value: u?.id })) }))
    }else{
      formik.resetForm()
    }
    init()
  }, [user])



  return (
    <Modal open={open} close={close} title="Add User">
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="mb-4 space-y-4">
          <Input name='name' label='Name' formik={formik} onChange={formik.handleChange} value={formik.values.name} />
          <MultiSelect name='sectors' label='Sectors' options={formik.values.allSectors} formik={formik} 
          handleChange={(val) => formik.setFieldValue("sectors", val)} />
        </div>
        <div className="mb-[12px]">
              <Checkbox
                formik={formik}
                name="agreedToTerms"
                labelComponent={
                  <span className="block text-primary ">
                    I have read, understood and I agree to the
                    <span
                      rel="noopener noreferrer"
                      className="cursor-pointer font-semibold underline hover:border-0"
                    >
                      {' '}
                      Terms and conditions
                    </span>
                  </span>
                }
              />
            </div>
        <Button type='submit' title='Submit' />
      </form>
      {loading && <LoadingIndicator />}
    </Modal>
  )
}
