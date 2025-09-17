import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { BookOpen, Award, GraduationCap, Play, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
var TradingCoachModule = function () {
    var _a = useState(null), selectedCourse = _a[0], setSelectedCourse = _a[1];
    var _b = useState('courses'), activeSection = _b[0], setActiveSection = _b[1];
    var courses = [
        {
            id: '1',
            title: 'Trading Basics',
            progress: 75,
            lessons: 12,
            duration: '4 hours',
            difficulty: 'Beginner',
            description: 'Learn fundamental trading concepts, market structure, and basic analysis techniques.'
        },
        {
            id: '2',
            title: 'Technical Analysis',
            progress: 45,
            lessons: 16,
            duration: '6 hours',
            difficulty: 'Intermediate',
            description: 'Master chart patterns, indicators, and technical analysis tools for better trading decisions.'
        },
        {
            id: '3',
            title: 'Risk Management',
            progress: 20,
            lessons: 10,
            duration: '3 hours',
            difficulty: 'Beginner',
            description: 'Essential risk management strategies to protect your trading capital.'
        },
        {
            id: '4',
            title: 'Options Trading',
            progress: 60,
            lessons: 20,
            duration: '8 hours',
            difficulty: 'Advanced',
            description: 'Advanced options strategies for experienced traders seeking sophisticated techniques.'
        }
    ];
    var tradingTerms = [
        { term: 'Bull Market', definition: 'A market characterized by rising prices and investor optimism' },
        { term: 'Bear Market', definition: 'A market characterized by falling prices and investor pessimism' },
        { term: 'P/E Ratio', definition: 'Price-to-earnings ratio, a valuation metric comparing stock price to earnings' },
        { term: 'Stop Loss', definition: 'An order to sell a security when it reaches a certain price to limit losses' },
        { term: 'Volatility', definition: 'A measure of price fluctuation over time, indicating market uncertainty' }
    ];
    var achievements = [
        { title: 'First Steps', completed: true, description: 'Complete your first trading lesson' },
        { title: 'Risk Master', completed: true, description: 'Complete the risk management course' },
        { title: 'Technical Analyst', completed: false, description: 'Master technical analysis fundamentals' },
        { title: 'Portfolio Builder', completed: false, description: 'Build a diversified trading portfolio' }
    ];
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'Advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsxs("div", { className: "p-3 md:p-6 h-full space-y-4 md:space-y-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(GraduationCap, { className: "text-blue-600", size: 20 }), _jsx("h2", { className: "text-lg md:text-xl font-bold text-gray-800", children: "Trading Coach" })] }), _jsxs("div", { className: "flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg", children: [_jsx(Button, { variant: activeSection === 'courses' ? 'default' : 'ghost', onClick: function () { return setActiveSection('courses'); }, size: "sm", className: "flex-1 text-xs", children: "Courses" }), _jsx(Button, { variant: activeSection === 'glossary' ? 'default' : 'ghost', onClick: function () { return setActiveSection('glossary'); }, size: "sm", className: "flex-1 text-xs", children: "Glossary" }), _jsx(Button, { variant: activeSection === 'achievements' ? 'default' : 'ghost', onClick: function () { return setActiveSection('achievements'); }, size: "sm", className: "flex-1 text-xs", children: "Awards" })] }), activeSection === 'courses' && (_jsx("div", { className: "space-y-4", children: !selectedCourse ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-4", children: "Your Learning Progress" }), _jsx("div", { className: "space-y-3", children: courses.map(function (course) { return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium", children: course.title }), _jsxs("span", { className: "text-sm font-bold text-blue-600", children: [course.progress, "%"] })] }), _jsx(Progress, { value: course.progress, className: "h-2" })] }, course.id)); }) })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-4", children: "Available Courses" }), _jsx("div", { className: "space-y-2", children: courses.map(function (course) { return (_jsx(Button, { variant: "outline", onClick: function () { return setSelectedCourse(course); }, className: "w-full justify-start text-left h-auto p-3", children: _jsxs("div", { className: "flex items-center gap-3 w-full", children: [_jsx(BookOpen, { size: 16, className: "text-blue-600" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-sm", children: course.title }), _jsxs("div", { className: "text-xs text-gray-600", children: [course.lessons, " lessons \u2022 ", course.duration] })] }), _jsx(Badge, { className: "text-xs ".concat(getDifficultyColor(course.difficulty)), children: course.difficulty })] }) }, course.id)); }) })] })] })) : (
                /* Selected Course Detail */
                _jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsx(Button, { variant: "outline", onClick: function () { return setSelectedCourse(null); }, size: "sm", className: "mb-4", children: "\u2190 Back to Courses" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-lg font-bold text-gray-800", children: selectedCourse.title }), _jsx(Badge, { className: getDifficultyColor(selectedCourse.difficulty), children: selectedCourse.difficulty })] }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: selectedCourse.description })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: "Lessons:" }), _jsx("span", { className: "font-bold ml-2", children: selectedCourse.lessons })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: "Duration:" }), _jsx("span", { className: "font-bold ml-2", children: selectedCourse.duration })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { children: "Your Progress" }), _jsxs("span", { className: "font-bold", children: [selectedCourse.progress, "%"] })] }), _jsx(Progress, { value: selectedCourse.progress, className: "h-4" })] }), _jsxs(Button, { className: "w-full", children: [_jsx(Play, { size: 16, className: "mr-2" }), selectedCourse.progress > 0 ? 'Continue Learning' : 'Start Course'] })] })] })) })), activeSection === 'glossary' && (_jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-4", children: "Trading Terms Glossary" }), _jsx("div", { className: "space-y-4", children: tradingTerms.map(function (item, index) { return (_jsxs("div", { className: "border-l-4 border-blue-500 pl-4 py-2", children: [_jsx("div", { className: "font-bold text-sm text-blue-600 mb-1", children: item.term }), _jsx("div", { className: "text-sm text-gray-600", children: item.definition })] }, index)); }) })] })), activeSection === 'achievements' && (_jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Award, { className: "text-yellow-600", size: 20 }), _jsx("h3", { className: "font-semibold text-gray-700", children: "Your Achievements" })] }), _jsx("div", { className: "space-y-3", children: achievements.map(function (achievement, index) { return (_jsx("div", { className: "p-3 rounded-lg border ".concat(achievement.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'), children: _jsxs("div", { className: "flex items-center gap-3", children: [achievement.completed ? (_jsx(CheckCircle, { className: "text-green-600", size: 20 })) : (_jsx(Lock, { className: "text-gray-400", size: 20 })), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-sm ".concat(achievement.completed ? 'text-green-800' : 'text-gray-600'), children: achievement.title }), _jsx("div", { className: "text-xs text-gray-600", children: achievement.description })] })] }) }, index)); }) })] }))] }));
};
export default TradingCoachModule;
