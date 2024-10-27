import { useEffect, useState } from "react"
import api from "./api/contacts"
import { FaPen, FaTrash } from "react-icons/fa"
import { BiUserCircle } from "react-icons/bi"
import AddContact from "./AddContact"
import UpdateContact from "./UpdateContact"

const App = () => {
	const [openAddForm, setOpenAddForm] = useState(false)
	const [openUpdateForm, setOpenUpdateForm] = useState(false)
	const [contacts, setContacts] = useState([])
	const [currentContact, setCurrentContact] = useState({})

	// CREATE
	const addContact = async (contact) => {
		console.log(contact)
		const request = {
			id: crypto.randomUUID(),
			...contact,
		}
		const response = await api.post("/contacts", request)
		// console.log(response)
		setContacts([...contacts, response.data])
	}

	// READ
	const retrieveContacts = async () => {
		const response = await api.get("/contacts")
		return response.data
	}

	// UPDATE
	const updateContact = async (updatedContact) => {
		const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact)

		// if (response.status === 200) {
		setContacts(
			contacts.map((contact) =>
				contact.id === response.data.id ? { ...response.data } : contact
			)
		)
		// }
	}

	// DELETE
	const deleteContact = async (id) => {
		await api.delete(`/contacts/${id}`)

		setContacts(contacts.filter((contact) => contact.id !== id))
	}

	useEffect(() => {
		const getAllContacts = async () => {
			const allContacts = await retrieveContacts()
			if (allContacts) setContacts(allContacts)
		}

		getAllContacts()
	}, [])

	return (
		<main className='space-y-6 w-96 mx-auto'>
			<h1 className='text-center text-4xl font-bold mt-8 border-b-2 pb-3'>Contact Manager</h1>
			<section className='flex justify-between'>
				<h2 className='text-3xl font-medium'>Contact List</h2>
				<button
					onClick={() => setOpenAddForm(true)}
					type='button'
					className='bg-blue-500 p-3 py-2 rounded-md text-white hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium'
				>
					Add Contact
				</button>
			</section>
			<section>
				<ol className='space-y-6'>
					{contacts?.map(({ id, name, email }) => (
						<li key={id} className='flex justify-between items-center'>
							<div className='flex space-x-3 font-bold items-center'>
								{/* <span>{index + 1}.</span> */}
								<span>
									<BiUserCircle className='text-4xl' />
								</span>
								<p className='flex flex-col'>
									<span className='font-semibold'>{name}</span>
									<span className='text-blue-500'>{email}</span>
								</p>
							</div>
							<div className='space-x-6'>
								<button
									onClick={() => {
										setCurrentContact({ id, name, email })
										setOpenUpdateForm(true)
									}}
									className=''
								>
									<FaPen title='edit' />
								</button>
								<button onClick={() => deleteContact(id)} className='text-lg'>
									<FaTrash title='delete' className='fill-rose-600' />
								</button>
							</div>
						</li>
					))}
				</ol>
			</section>
			<AddContact {...{ open: openAddForm, setOpen: setOpenAddForm, add: addContact }} />
			<UpdateContact
				{...{
					open: openUpdateForm,
					setOpen: setOpenUpdateForm,
					update: updateContact,
					initialContact: currentContact,
				}}
			/>
		</main>
	)
}

export default App
