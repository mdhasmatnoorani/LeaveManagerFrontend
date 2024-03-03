export class Leave {
    leaveId: string;
    empId: string;
    leaveType: string;
    leaveCategory: string;
    leaveFrom: Date;
    leaveTill: Date;
    approvedBy: string;
    isApproved: string;
    createdAt: Date;
    updatedAt: Date;
    isProcessed: number;
    lastExecutionTime: Date;
}