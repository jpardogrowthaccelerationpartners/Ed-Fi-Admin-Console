import ConsoleModal from '../../ConsoleModal'
import InviteUserForm from './InviteUserForm'

interface InviteUserModalProps {
    show: boolean 
    onAfterAction: () => void
    onClose: () => void
}

const InviteUserModal = ({ show, onAfterAction, onClose }: InviteUserModalProps) => {
  return (
    <ConsoleModal
      content={<InviteUserForm 
        onAfterAction={onAfterAction}
        onClose={onClose}
      />}
      show={show}
      onClose={onClose}
    />
  )
}

export default InviteUserModal