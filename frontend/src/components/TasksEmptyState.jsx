import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TasksEmptyState = ({ filter }) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className="space-y-3">
                <Circle className='mx-auto size-12 text-muted-foreground' />
                <div>
                    <h3 className='font-medium text-foreground'>
                        {
                            filter === 'active' ?
                                'Không có nhiệm vụ gì đang làm.':
                            filter === 'completed' ? 
                                'Chưa có nhiệm vụ nào hoàn thành.':
                                'Hiện chưa có nhiệm vụ.'
                        }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {
                            filter==="all"? "Thêm nhiệm vụ đầu tiên để bắt đầu.":
                            `Chuyển sang "Tất cả" để thấy những nhiệm vụ ${filter==='active' ? 'Đã hoàn thành' : 'Đang làm.'}`
                        }
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default TasksEmptyState