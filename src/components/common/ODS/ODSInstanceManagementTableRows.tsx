import { ExtendedODSInstance } from "../../../core/ODSInstance.types"
import { UpdatingIsDefaultStatus } from "../../../hooks/odsInstances/useOdsInstanceTable.types"
import useValidateSetAsDefault from "../../../hooks/odsInstances/useValidateSetAsDefault"
import ControlTableRow from "../ControlTableRow"
import ODSInstanceManagementTableRowItem from "./ODSInstanceManagementTableRowItem"
import { ODSInstanceTableMode } from "./ODSInstanceTable.types"

interface ODSInstanceManagementTableRowsProps {
    tableMode: ODSInstanceTableMode
    instanceList: ExtendedODSInstance[]
    updatingIsDefault: UpdatingIsDefaultStatus
    selectedInstance: ExtendedODSInstance | null
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onOpenSetDefaultModal: (instanceId: string) => void
    onOpenSetUpModal: (instanceId: string) => void
}

const ODSInstanceManagementTableRows = ({ tableMode, selectedInstance, instanceList, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableRowsProps) => {
    const {
        canSetAsDefault
    } = useValidateSetAsDefault()

    const filterInstancesFromMode = (instance: ExtendedODSInstance) => {
        if (tableMode != "Show Selected")
            return true 

        return instance.instanceId == selectedInstance?.instanceId
    }

    return (
        <>
            {instanceList.filter(instance => filterInstancesFromMode(instance)).map((instance, index) => 
                <ControlTableRow key={index}>
                    <ODSInstanceManagementTableRowItem
                        key={index}
                        tableMode={tableMode}
                        selectedInstance={selectedInstance}
                        instance={instance}
                        canSetAsDefault={canSetAsDefault(instance, instanceList)}
                        updatingIsDefault={updatingIsDefault}
                        onSelectInstance={onSelectInstance}
                        onOpenSetDefaultModal={onOpenSetDefaultModal}
                        onOpenSetUpModal={onOpenSetUpModal} />
                </ControlTableRow>
            )}
        </>
    )
}

export default ODSInstanceManagementTableRows