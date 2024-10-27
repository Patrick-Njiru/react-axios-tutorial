import PropTypes from "prop-types"
import { useState } from "react"

const AddContact = ({ open, setOpen, add }) => {
	const [form, setForm] = useState({
		name: "",
		email: "",
	})

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

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
				onSubmit={(e) => {
					e.preventDefault()
					setOpen(false)
					add(form)
					setForm({ name: "", email: "" })
				}}
				className='space-y-4'
			>
				<legend className='text-lg font-semibold'>Add Contact</legend>
				<fieldset className='space-y-3'>
					<label htmlFor='name' className='flex flex-col-reverse gap-2'>
						<input
							type='text'
							name='name'
							id='name'
							value={form.name}
							onChange={handleChange}
							required
						/>
						<span>Name</span>
					</label>
					<label htmlFor='email' className='flex flex-col-reverse gap-2'>
						<input
							type='email'
							name='email'
							id='email'
							value={form.email}
							onChange={handleChange}
							required
						/>
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

AddContact.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	add: PropTypes.func.isRequired,
}

export default AddContact
