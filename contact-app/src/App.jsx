import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import api from "./api/contacts"
import { FaTrash } from "react-icons/fa"

const App = () => {
	const [openForm, setOpenForm] = useState(false)
	const [contacts, setContacts] = useState([])

	const retrieveContacts = async () => {
		const response = await api.get("/contacts")
		return response.data
	}

	useEffect(() => {
		const getAllContacts = async () => {
			const allContacts = await retrieveContacts()
			allContacts ? setContacts(allContacts) : ""
		}

		getAllContacts()
	}, [])

	return (
		<main className='space-y-6 w-96 mx-auto'>
			<h1 className='text-center text-4xl font-bold mt-8 border-b-2 pb-3'>Contact Manager</h1>
			<section className='flex justify-between'>
				<h2 className='text-3xl font-medium'>Contact List</h2>
				<button
					onClick={() => setOpenForm(true)}
					type='button'
					className='bg-blue-500 p-3 py-2 rounded-md text-white hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium'
				>
					Add Contact
				</button>
			</section>
			<section>
				<ol className='space-y-6'>
					{contacts?.map((contact, index) => (
						<li key={contact.id} className='flex justify-between items-center'>
							<div className='flex space-x-3 font-bold'>
								<span>{index + 1}.</span>
								<p className='flex flex-col'>
									<span className='font-semibold'>{contact.name}</span>
									<span className='text-blue-500'>{contact.email}</span>
								</p>
							</div>
							<button className='text-lg'>
								<FaTrash />
							</button>
						</li>
					))}
				</ol>
			</section>
			<AddContactModal {...{ open: openForm, setOpen: setOpenForm }} />
		</main>
	)
}

const AddContactModal = ({ open, setOpen }) => {
	return (
		<dialog open={open} className='bg-gray-700 text-white rounded-md p-4 fixed top-1/4'>
			<button
				type='button'
				title='close'
				onClick={() => setOpen(false)}
				className='absolute end-4 text-red-600 text-2xl transition-all duration-100 ease-in-out hover:scale-125'
			>
				x
			</button>
			<form
				className='space-y-4'
				onSubmit={(e) => {
					e.preventDefault()
					setOpen(false)
				}}
			>
				<legend className='text-lg font-semibold'>Add Contact</legend>
				<fieldset className='space-y-3'>
					<label htmlFor='name' className='flex flex-col-reverse gap-2'>
						<input type='text' name='name' id='name' required />
						<span>Name</span>
					</label>
					<label htmlFor='name' className='flex flex-col-reverse gap-2'>
						<input type='email' name='email' id='email' required />
						<span>Email</span>
					</label>
				</fieldset>
				<button
					type='submit'
					className='bg-blue-500 w-full py-2 rounded-md text-white hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium'
				>
					Add
				</button>
			</form>
		</dialog>
	)
}

AddContactModal.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
}

export default App
