// import React from 'react'
import { useState } from 'react'
import UserImg from '../../../assets/default-user.svg'
import Button from '../components/Buttons/Button'
import InputField from '../components/Input/InputField'
import InputSelect from '../components/Input/InputSelect'

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    avatarUrl: '',
    firstName: '',
    lastName: '',
    biography: '',
    nik: '',
    phone: '',
    gender: '',
  })

  const genderOptions = [
    { label: 'Laki - laki', value: 'L' },
    { label: 'Perempuan', value: 'P' },
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="container mt-32 flex flex-col gap-8 rounded-2xl bg-white py-12 text-primary-950">
      <h3 className="text-2xl font-bold">Profil</h3>
      <div className="flex w-fit items-center gap-4 rounded-2xl">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img
            className="h-full w-full scale-125 object-cover"
            src={UserImg}
            alt="default user image"
          />
        </div>
        <h5 className="text-xl">denjayx</h5>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="firstName"
            label="Nama Depan"
            type="text"
            placeholder="Masukkan nama depan"
            isDisabled={isDisabled}
            onChange={handleInputChange}
          />
          <InputField
            name="lastName"
            label="Nama Belakang"
            type="text"
            placeholder="Masukkan nama belakang"
            isDisabled={isDisabled}
            onChange={handleInputChange}
          />
          <InputField
            name="email"
            label="Email"
            type="denjayx@gmail.coom"
            value="denyw602@gmail.com"
            placeholder="Masukkan email"
            isDisabled={isDisabled}
            onChange={handleInputChange}
          />
          <InputField
            name="phone"
            label="No. Telepon"
            type="number"
            placeholder="62xxxx"
            isDisabled={isDisabled}
            onChange={handleInputChange}
          />
          <InputField
            name="nik"
            label="No. KTP"
            type="number"
            placeholder="Masukkan Nomor Induk KTP"
            isDisabled={isDisabled}
            onChange={handleInputChange}
          />
          <InputSelect
            label="Jenis Kelamin"
            name="gender"
            options={genderOptions}
            isDisabled={isDisabled}
            onSelect={handleSelectChange}
          />
          <InputField
            name="biography"
            label="Deskripsi diri"
            type="textArea"
            placeholder="Deskripsi diri / Bio"
            isDisabled={isDisabled}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-full justify-end">
          {isDisabled ? (
            <Button
              variant="primary"
              type="button"
              className="w-fit"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              Edit Profil
            </Button>
          ) : (
            <Button variant="primary" className="w-fit" type="submit">
              Simpan
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}

export default Profile
