import React, { useEffect, useState } from 'react'
import Header from "@/components/Header";
import AddTask from '@/components/AddTask';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import TaskList from '@/components/TaskList';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(()=>{
    setPage(1)
  },[filter,dateQuery])
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  const fetchTasks = async () => {

    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount)
      setCompletedTaskCount(res.data.completedCount)
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất task: ", error);
      toast.error(`Lỗi xảy ra khi truy xuất task: ${error}`);
    }
  };
  //biến lưu danh sách nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === 'active';
      case "completed":
        return task.status === 'completed';
      default:
        return true;

    }
  });

  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  
  const totalPage = Math.ceil(filteredTasks.length / visibleTaskLimit);
  const handleTaskChange = () => {
    fetchTasks();
  };
  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handlePageChange = (newPage) => {
      setPage(newPage);
  };
  if(visibleTask.length===0){
    handlePrev();
  }
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className='container pt-8  mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
          {/* Đầu Trang Header */}
          <Header />

          {/* Tạo nhiệm vụ AddTask */}
          <AddTask
            HandleNewTaskAdded={handleTaskChange}
          />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          {/* Danh sách nhiệm vụ  */}
          <TaskList filteredTasks={visibleTask}
            filter={filter}
            handleTaskChanged={handleTaskChange}
          />

          {/* Phân trang và lọc theo hàng */}
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination 
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlePageChange={handlePageChange}
            page={page}
            totalPage={totalPage}
            
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chân trang footer */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>

  )
}

export default HomePage