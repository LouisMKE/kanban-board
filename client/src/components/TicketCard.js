import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const TicketCard = ({ ticket, deleteTicket }) => {
    const handleDelete = async (event) => {
        const ticketId = Number(event.currentTarget.value);
        if (!isNaN(ticketId)) {
            try {
                const data = await deleteTicket(ticketId);
                console.log('Ticket deleted:', data);
                return data; // Explicitly return data
            }
            catch (error) {
                console.error('Failed to delete ticket:', error);
                return { message: 'Failed to delete ticket' }; // Return default ApiMessage in case of error
            }
        }
        console.warn('Invalid ticket ID:', ticketId);
        return { message: 'Invalid ticket ID' }; // Return default ApiMessage for invalid ID
    };
    return (_jsxs("div", { className: 'ticket-card', children: [_jsx("h3", { children: ticket.name }), _jsx("p", { children: ticket.description }), _jsx("p", { children: ticket.assignedUser?.username }), _jsx(Link, { to: '/edit', state: { id: ticket.id }, type: 'button', className: 'editBtn', children: "Edit" }), _jsx("button", { type: 'button', value: String(ticket.id), onClick: handleDelete, className: 'deleteBtn', children: "Delete" })] }));
};
export default TicketCard;