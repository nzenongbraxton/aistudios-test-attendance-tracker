import React, { useState } from 'react';
import { Employee } from '../types';
import { Plus, Search, MoreVertical, Mail, Briefcase } from 'lucide-react';

interface EmployeesProps {
  employees: Employee[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
}

export function Employees({ employees, addEmployee }: EmployeesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', role: '', department: '', email: '' });

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmp.name && newEmp.role && newEmp.department && newEmp.email) {
      addEmployee(newEmp);
      setNewEmp({ name: '', role: '', department: '', email: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 text-slate-800 dark:text-slate-200 transition-all outline-none"
          />
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 transition-colors">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Add New Employee</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newEmp.name}
              onChange={e => setNewEmp({...newEmp, name: e.target.value})}
              className="px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newEmp.email}
              onChange={e => setNewEmp({...newEmp, email: e.target.value})}
              className="px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
              required
            />
            <input
              type="text"
              placeholder="Role / Title"
              value={newEmp.role}
              onChange={e => setNewEmp({...newEmp, role: e.target.value})}
              className="px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={newEmp.department}
              onChange={e => setNewEmp({...newEmp, department: e.target.value})}
              className="px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
              required
            />
            <div className="lg:col-span-4 flex justify-end space-x-3 mt-2">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredEmployees.map(employee => (
          <div key={employee.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-lg">
                {employee.name.charAt(0)}
              </div>
              <button className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{employee.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{employee.role}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Briefcase className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                {employee.department}
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                <span className="truncate">{employee.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
