import Task from '../models/Task.js'
//Đọc 
export const getAllTask = async (request, response) => {
    const { filter } = request.query;
    const now = new Date();
    let startDate;
    switch (filter) {
        case 'today': {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            break;
        }
        case 'week': {
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case 'month': {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case 'all':
        default: {
            startDate = null;
        }
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
        const result = await Task.aggregate([
            {$match: query},
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completedCount: [{ $match: { status: "completed" } }, { $count: "count" }],
                },
            },
        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0
        const completedCount = result[0].completedCount[0]?.count || 0
        response.status(200).json({ tasks, activeCount, completedCount });
    } catch (error) {
        console.error('Lỗi khi getAllTask', error);
        response.status(500).json({ message: 'Lỗi hệ thống' })
    }
}
//Thêm
export const createTask = async (request, response) => {
    try {
        const { title } = request.body;
        const task = new Task({ title });
        const newTask = await task.save();
        response.status(201).json(newTask);
    } catch (error) {
        console.error('Lỗi khi createTask', error);
        response.status(500).json({ message: 'Lỗi hệ thống' })
    }
}
//Cập nhật
export const updateTask = async (request, response) => {
    try {
        const { title, status } = request.body;

        let completedAtValue = null;

        // xử lý logic
        if (status === "completed") {
            completedAtValue = new Date();
        } else if (status === "active") {
            completedAtValue = null;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            request.params.id,
            {
                title,
                status,
                completedAt: completedAtValue
            },
            {
                new: true
            }
        );
        if (!updatedTask) {
            return response.status(404).json({ message: 'Nhiệm vụ không tồn tại!' })
        }
        response.status(200).json(updatedTask)
    } catch (error) {
        console.error('Lỗi khi updateTasks', error);
        response.status(500).json({ message: 'Lỗi hệ thống' })
    }
}
//Xóa
export const deleteTask = async (request, response) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(request.params.id);
        if (!deletedTask) {
            return response.status(404).json({ message: 'Nhiệm vụ không tồn tại!' })
        }
        response.status(200).json(deletedTask)
    } catch (error) {
        console.error('Lỗi khi deletedTasks', error);
        response.status(500).json({ message: 'Lỗi hệ thống' })
    }
}