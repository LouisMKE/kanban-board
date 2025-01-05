import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);

    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        console.log('Ticket deleted:', data);
        return data; // Explicitly return data
      } catch (error) {
        console.error('Failed to delete ticket:', error);
        return { message: 'Failed to delete ticket' } as ApiMessage; // Return default ApiMessage in case of error
      }
    }

    console.warn('Invalid ticket ID:', ticketId);
    return { message: 'Invalid ticket ID' } as ApiMessage; // Return default ApiMessage for invalid ID
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link
        to='/edit'
        state={{ id: ticket.id }}
        type='button'
        className='editBtn'
      >
        Edit
      </Link>
      <button
        type='button'
        value={String(ticket.id)}
        onClick={handleDelete}
        className='deleteBtn'
      >
        Delete
      </button>
    </div>
  );
};

export default TicketCard;
