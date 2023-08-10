
import React, { useState } from 'react';
import moment from 'moment';
import './main.css';

const CalendarCard = () => {
   
        const [selectedDate, setSelectedDate] = useState(moment());

        const renderCalendar = () => {
            const startOfMonth = selectedDate.clone().startOf('month');
            const endOfMonth = selectedDate.clone().endOf('month');
            const startDate = startOfMonth.clone().subtract(startOfMonth.day(), 'days');
            const endDate = endOfMonth.clone().add(6 - endOfMonth.day(), 'days');

            const calendar = [];
            let currentDate = startDate.clone();

            while (currentDate.isSameOrBefore(endDate)) {
                const isCurrentMonth = currentDate.isSame(selectedDate, 'month');
                const isToday = currentDate.isSame(moment(), 'day');

                calendar.push(
                    <div
                        key={currentDate.format('YYYY-MM-DD')}
                        className={`date ${isCurrentMonth ? 'current-month' : ''} ${isToday ? 'today' : ''}`}
                    >
                        {currentDate.date()}
                    </div>
                );

                currentDate.add(1, 'day');
            }

            return calendar;
        };

        const handleNextMonth = () => {
            setSelectedDate(selectedDate.clone().add(1, 'month'));
        };

        const handlePrevMonth = () => {
            setSelectedDate(selectedDate.clone().subtract(1, 'month'));
        };

        return (
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePrevMonth}>&lt;</button>
                    <h2 className="current-month">{selectedDate.format('MMMM YYYY')}</h2>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="dates">{renderCalendar()}</div>
            </div>
        );
    };

  
export default CalendarCard;