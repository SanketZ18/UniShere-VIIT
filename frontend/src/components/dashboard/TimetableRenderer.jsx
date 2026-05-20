import React, { useState } from 'react'
import { Plus, Trash2, Calendar, FileSpreadsheet, RefreshCw, Eye, Edit2, ShieldAlert } from 'lucide-react'

// Pre-defined templates for MCA I and MCA II as starting points
const MCA_I_TEMPLATE = {
  batch: 'MCA I (Batch : 2024-26) (2024 Pattern)',
  wef: 'Timetable w.e.f. 2nd September 2024, Monday',
  classroom: 'C5',
  lab: 'LAB - 3',
  classCoordinator: 'Mr. Rakesh Kulkarni',
  pattern: '2024 Pattern',
  rows: [
    { time: '9.00 to 10.00 am', isBreak: false, breakName: '', monday: 'ICS (MK)', tuesday: 'DS&A (RK)', wednesday: 'BS (SP)', thursday: 'BS (SP)', friday: 'PP (VT)', saturday: 'SEPM (NF)' },
    { time: '10.00 to 10.30 am', isBreak: true, breakName: 'Tea', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' },
    { time: '10.30 to 11.30 am', isBreak: false, breakName: '', monday: 'DS&A (RK)', tuesday: 'ICS (MK)', wednesday: 'ICS (MK)', thursday: 'PP (VT)', friday: 'DS&A (RK)', saturday: 'IKS' },
    { time: '11.30 to 12.30 pm', isBreak: false, breakName: '', monday: 'SEPM (NF)', tuesday: 'SEPM (NF)', wednesday: 'PP & DS LAB', thursday: 'SS-I (AA)', friday: 'PP & DS LAB', saturday: 'SDA/Guest Session' },
    { time: '12.30 to 1.30 pm', isBreak: false, breakName: '', monday: 'PP (VT)', tuesday: 'BS (SP)', wednesday: 'PP & DS LAB', thursday: 'ADBMS(VT)', friday: 'PP & DS LAB', saturday: 'SDA/Guest Session' },
    { time: '1.30 to 2.30 pm', isBreak: true, breakName: 'Lunch', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' },
    { time: '2.30 to 3.30 pm', isBreak: false, breakName: '', monday: 'ADBMS (VT)', tuesday: 'ADBMS (VT)', wednesday: 'Library Exercise', thursday: 'Mini Project', friday: 'Mentoring', saturday: 'Sports' },
    { time: '3.30 to 4.30 pm', isBreak: false, breakName: '', monday: 'MOOC', tuesday: 'T & P', wednesday: 'MOOC', thursday: 'T & P', friday: '', saturday: '' }
  ],
  courses: [
    { srNo: '1', courseTitle: 'Python Programming', courseCode: 'IT11', cp: '3', ext: '50', intMarks: '25', faculty: 'Ms. Vaishnavi Tilekar', isHeader: false, headerText: '' },
    { srNo: '2', courseTitle: 'Data Structure and Algorithms', courseCode: 'IT12', cp: '3', ext: '50', intMarks: '25', faculty: 'Mr. Rakesh Kulkarni', isHeader: false, headerText: '' },
    { srNo: '3', courseTitle: 'Advanced DBMS', courseCode: 'IT13', cp: '3', ext: '50', intMarks: '25', faculty: 'Ms. Vaishnavi Tilekar', isHeader: false, headerText: '' },
    { srNo: '4', courseTitle: 'Business Statistics', courseCode: 'MT11', cp: '3', ext: '50', intMarks: '25', faculty: 'Dr. Santosh Parakh', isHeader: false, headerText: '' },
    { srNo: '5', courseTitle: 'Software Engineering and Project Mgmt.', courseCode: 'IT14', cp: '3', ext: '50', intMarks: '25', faculty: 'NF', isHeader: false, headerText: '' },
    { srNo: '6', courseTitle: 'Elective- I : Introduction to Cyber Security', courseCode: 'EC1-4', cp: '3', ext: '50', intMarks: '25', faculty: 'Dr. Mayank Kothawade', isHeader: false, headerText: '' },
    { srNo: '', courseTitle: '', courseCode: '', cp: '', ext: '', intMarks: '', faculty: '', isHeader: true, headerText: '*Practical' },
    { srNo: '7', courseTitle: 'Practical based on Python and DS', courseCode: 'IT11L', cp: '3', ext: '', intMarks: '50', faculty: 'Mr. Rakesh Kulkarni/Ms. Vaishnavi Tilekar', isHeader: false, headerText: '' },
    { srNo: '8', courseTitle: 'Mini Project', courseCode: 'ITC11', cp: '3', ext: '', intMarks: '50', faculty: 'Mr. Rakesh Kulkarni', isHeader: false, headerText: '' },
    { srNo: '', courseTitle: '', courseCode: '', cp: '', ext: '', intMarks: '', faculty: '', isHeader: true, headerText: 'Soft Skills and IKS' },
    { srNo: '9', courseTitle: 'Soft Skills – I', courseCode: 'SS11', cp: '1', ext: '', intMarks: '25', faculty: 'Mr. Ajit Adsul', isHeader: false, headerText: '' },
    { srNo: '10', courseTitle: 'IKS', courseCode: 'IK11', cp: '1', ext: '', intMarks: '25', faculty: 'Dr. Mayank Kothawade', isHeader: false, headerText: '' }
  ]
}

const MCA_II_TEMPLATE = {
  batch: 'MCA II (Batch : 2023-25) (2020 Pattern)',
  wef: 'Timetable w.e.f. 2nd September 2024, Monday',
  classroom: 'C6',
  lab: 'LAB - 4',
  classCoordinator: 'Mrs. S. R. Deshpande',
  pattern: '2020 Pattern',
  rows: [
    { time: '9.00 to 10.00 am', isBreak: false, breakName: '', monday: 'Java (SD)', tuesday: 'OS (NS)', wednesday: 'OS (NS)', thursday: 'Java (SD)', friday: 'ML (AP)', saturday: 'ML (AP)' },
    { time: '10.00 to 10.30 am', isBreak: true, breakName: 'Tea', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' },
    { time: '10.30 to 11.30 am', isBreak: false, breakName: '', monday: 'ML (AP)', tuesday: 'Java (SD)', wednesday: 'Cloud (SS)', thursday: 'Cloud (SS)', friday: 'OS (NS)', saturday: 'Seminar' },
    { time: '11.30 to 12.30 pm', isBreak: false, breakName: '', monday: 'Java & OS LAB', tuesday: 'Java & OS LAB', wednesday: 'IoT (RK)', thursday: 'IoT (RK)', friday: 'ML LAB', saturday: 'ML LAB' },
    { time: '12.30 to 1.30 pm', isBreak: false, breakName: '', monday: 'Java & OS LAB', tuesday: 'Java & OS LAB', wednesday: 'CC (AP)', thursday: 'CC (AP)', friday: 'ML LAB', saturday: 'ML LAB' },
    { time: '1.30 to 2.30 pm', isBreak: true, breakName: 'Lunch', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' },
    { time: '2.30 to 3.30 pm', isBreak: false, breakName: '', monday: 'Project Work', tuesday: 'Project Work', wednesday: 'Library', thursday: 'Mentoring', friday: 'Sports', saturday: 'Placement Cell' },
    { time: '3.30 to 4.30 pm', isBreak: false, breakName: '', monday: 'T & P', tuesday: 'T & P', wednesday: 'Placement Cell', thursday: 'Mentoring', friday: '', saturday: '' }
  ],
  courses: [
    { srNo: '1', courseTitle: 'Java Programming', courseCode: 'IT31', cp: '3', ext: '50', intMarks: '25', faculty: 'Mrs. S. R. Deshpande', isHeader: false, headerText: '' },
    { srNo: '2', courseTitle: 'Machine Learning', courseCode: 'IT32', cp: '3', ext: '50', intMarks: '25', faculty: 'Dr. A. P. Mane', isHeader: false, headerText: '' },
    { srNo: '3', courseTitle: 'Cloud Computing', courseCode: 'IT33', cp: '3', ext: '50', intMarks: '25', faculty: 'Mrs. S. S. Shinde', isHeader: false, headerText: '' },
    { srNo: '4', courseTitle: 'Operating Systems', courseCode: 'IT34', cp: '3', ext: '50', intMarks: '25', faculty: 'Mr. N. S. Patil', isHeader: false, headerText: '' },
    { srNo: '', courseTitle: '', courseCode: '', cp: '', ext: '', intMarks: '', faculty: '', isHeader: true, headerText: '*Practical' },
    { srNo: '5', courseTitle: 'Java & OS Lab', courseCode: 'IT31L', cp: '2', ext: '', intMarks: '50', faculty: 'Mrs. S. R. Deshpande / Mr. N. S. Patil', isHeader: false, headerText: '' },
    { srNo: '6', courseTitle: 'ML & Cloud Lab', courseCode: 'IT32L', cp: '2', ext: '', intMarks: '50', faculty: 'Dr. A. P. Mane / Mrs. S. S. Shinde', isHeader: false, headerText: '' }
  ]
}

const EMPTY_TEMPLATE = {
  batch: 'MCA I (Batch : 2024-26)',
  wef: 'Timetable w.e.f. [Date]',
  classroom: 'C5',
  lab: 'LAB - 3',
  classCoordinator: '[Name]',
  pattern: '2024 Pattern',
  rows: [
    { time: '9.00 to 10.00 am', isBreak: false, breakName: '', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' }
  ],
  courses: [
    { srNo: '1', courseTitle: '', courseCode: '', cp: '', ext: '', intMarks: '', faculty: '', isHeader: false, headerText: '' }
  ]
}

// Helper function for deep copying template/timetable objects to prevent in-memory mutation overrides
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export default function TimetableRenderer({ timetableData, isEditMode = false, onSave, isSaving = false, semester = 1, department = 'MCA', onSemesterChange }) {
  // Local state for the editable timetable
  const [data, setData] = useState(() => {
    if (timetableData && timetableData.rows && timetableData.rows.length > 0) {
      return {
        batch: timetableData.batch || '',
        wef: timetableData.wef || '',
        classroom: timetableData.classroom || '',
        lab: timetableData.lab || '',
        classCoordinator: timetableData.classCoordinator || '',
        pattern: timetableData.pattern || '',
        rows: deepCopy(timetableData.rows),
        courses: deepCopy(timetableData.courses)
      }
    }
    // Deep copy default templates based on current active year/semester:
    // Semester 1 & 2 are First Year (MCA I Template)
    // Semester 3 & 4 are Second Year (MCA II Template)
    const isSecondYear = (semester === 3 || semester === 4)
    return isSecondYear ? deepCopy(MCA_II_TEMPLATE) : deepCopy(MCA_I_TEMPLATE)
  })

  const [activeViewMode, setActiveViewMode] = useState(isEditMode ? 'edit' : 'view')

  // Handle template loading
  const loadTemplate = (templateType) => {
    if (!window.confirm('Are you sure you want to load this template? It will overwrite any unsaved changes.')) return
    
    if (templateType === 'mca1') {
      setData(deepCopy(MCA_I_TEMPLATE))
    } else if (templateType === 'mca2') {
      setData(deepCopy(MCA_II_TEMPLATE))
    } else {
      setData(deepCopy(EMPTY_TEMPLATE))
    }
  }

  // Update top-level text fields
  const handleFieldChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  // Update individual cell in the timetable grid
  const handleGridCellChange = (rowIndex, field, value) => {
    setData(prev => {
      const updatedRows = [...prev.rows]
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value }
      return { ...prev, rows: updatedRows }
    })
  }

  // Row operations for Grid
  const addLectureRow = () => {
    setData(prev => ({
      ...prev,
      rows: [
        ...prev.rows,
        { time: '9.00 to 10.00 am', isBreak: false, breakName: '', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' }
      ]
    }))
  }

  const addBreakRow = (breakType = 'Tea') => {
    setData(prev => ({
      ...prev,
      rows: [
        ...prev.rows,
        { time: '', isBreak: true, breakName: breakType, monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' }
      ]
    }))
  }

  const removeRow = (index) => {
    setData(prev => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index)
    }))
  }

  // Course table operations
  const handleCourseCellChange = (index, field, value) => {
    setData(prev => {
      const updatedCourses = [...prev.courses]
      updatedCourses[index] = { ...updatedCourses[index], [field]: value }
      return { ...prev, courses: updatedCourses }
    })
  }

  const addCourseRow = (isHeader = false) => {
    setData(prev => ({
      ...prev,
      courses: [
        ...prev.courses,
        isHeader 
          ? { srNo: '', courseTitle: '', courseCode: '', cp: '', ext: '', intMarks: '', faculty: '', isHeader: true, headerText: 'New Section' }
          : { srNo: String(prev.courses.filter(c => !c.isHeader).length + 1), courseTitle: '', courseCode: '', cp: '', ext: '', intMarks: '', faculty: '', isHeader: false, headerText: '' }
      ]
    }))
  }

  const removeCourseRow = (index) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(data)
    }
  }

  // Calculate totals for Syllabus table
  const totalCredits = data.courses.reduce((acc, c) => acc + (Number(c.cp) || 0), 0)
  const totalExt = data.courses.reduce((acc, c) => acc + (Number(c.ext) || 0), 0)
  const totalInt = data.courses.reduce((acc, c) => acc + (Number(c.intMarks) || 0), 0)

  return (
    <div className="space-y-6">
      {/* Editor Controls (Visible only for HOD/Admin in Edit Mode) */}
      {isEditMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-[1.8rem] p-5 md:p-6 flex flex-col gap-4 shadow-sm">
          {/* Upper Side: Text Header */}
          <div className="flex items-center gap-3 w-full border-b border-amber-200 pb-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Edit2 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-900">HOD Timetable Studio</h3>
              <p className="text-xs text-amber-700 font-semibold">Load pre-built templates or completely build a custom schedule from scratch.</p>
            </div>
          </div>

          {/* Downside: All buttons in a single row (no scrollbar, perfectly responsive and padded) */}
          <div className="flex flex-row items-center gap-2.5 w-full">
            <button
              type="button"
              onClick={() => {
                if (onSemesterChange) {
                  onSemesterChange(1) // Switch to Semester 1 (MCA I)
                }
              }}
              className={`border text-[10px] md:text-xs font-black uppercase tracking-wider px-2 md:px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition flex-1 shrink-0 ${
                (semester === 1 || semester === 2)
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <Calendar size={12} className="shrink-0" />
              <span className="truncate">MCA I Template</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onSemesterChange) {
                  onSemesterChange(3) // Switch to Semester 3 (MCA II)
                }
              }}
              className={`border text-[10px] md:text-xs font-black uppercase tracking-wider px-2 md:px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition flex-1 shrink-0 ${
                (semester === 3 || semester === 4)
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <Calendar size={12} className="shrink-0" />
              <span className="truncate">MCA II Template</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!window.confirm('Are you sure you want to load the default template for this semester? It will overwrite any unsaved changes.')) return
                if (semester === 1 || semester === 2) {
                  setData(deepCopy(MCA_I_TEMPLATE))
                } else if (semester === 3 || semester === 4) {
                  setData(deepCopy(MCA_II_TEMPLATE))
                } else {
                  setData(deepCopy(EMPTY_TEMPLATE))
                }
              }}
              className="bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-[10px] md:text-xs font-black uppercase tracking-wider px-2 md:px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition flex-1 shrink-0"
            >
              <RefreshCw size={12} className="shrink-0" />
              <span className="truncate">Reset Template</span>
            </button>

            <div className="w-[1px] h-8 bg-amber-200 shrink-0 mx-0.5" />

            <button
              type="button"
              onClick={() => setActiveViewMode(activeViewMode === 'view' ? 'edit' : 'view')}
              className={`text-[10px] md:text-xs font-black uppercase tracking-wider px-2 md:px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition flex-1 shrink-0 ${
                activeViewMode === 'view'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              {activeViewMode === 'view' ? <Edit2 size={12} className="shrink-0" /> : <Eye size={12} className="shrink-0" />}
              <span className="truncate">{activeViewMode === 'view' ? 'Edit Mode' : 'View Preview'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Timetable Sheet Area */}
      <div className="bg-white border-2 border-slate-900 shadow-[8px_8px_0px_#0f172a] rounded-3xl overflow-hidden p-6 md:p-8 animate-in fade-in duration-200">
        
        {/* Timetable Header Fields */}
        <div className="text-center mb-6 space-y-3">
          {activeViewMode === 'edit' ? (
            <div className="grid gap-3 max-w-4xl mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 text-left mb-1">Batch & Pattern Heading</label>
                  <input
                    type="text"
                    value={data.batch}
                    onChange={(e) => handleFieldChange('batch', e.target.value)}
                    placeholder="e.g. MCA I (Batch : 2024-26) (2024 Pattern)"
                    className="w-full text-center bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-extrabold outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 text-left mb-1">Effective Date Subheader</label>
                  <input
                    type="text"
                    value={data.wef}
                    onChange={(e) => handleFieldChange('wef', e.target.value)}
                    placeholder="e.g. Timetable w.e.f. 2nd September 2024, Monday"
                    className="w-full text-center bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-extrabold outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 text-left mb-1">Classroom</label>
                  <input
                    type="text"
                    value={data.classroom}
                    onChange={(e) => handleFieldChange('classroom', e.target.value)}
                    placeholder="e.g. C5"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 text-left mb-1">Lab</label>
                  <input
                    type="text"
                    value={data.lab}
                    onChange={(e) => handleFieldChange('lab', e.target.value)}
                    placeholder="e.g. LAB - 3"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 text-left mb-1">Class Coordinator</label>
                  <input
                    type="text"
                    value={data.classCoordinator}
                    onChange={(e) => handleFieldChange('classCoordinator', e.target.value)}
                    placeholder="e.g. Mr. Rakesh Kulkarni"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-slate-900 bg-[#fff2cc] p-4 text-slate-950">
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-wide border-b border-slate-900 pb-2">
                {data.batch || 'MCA TIMETABLE'}
              </h2>
              <h3 className="text-xs md:text-sm font-extrabold uppercase py-2 border-b border-slate-900">
                {data.wef || 'Weekly Schedule'}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-2 text-xs md:text-sm font-bold">
                <span>Class room : <strong className="font-black text-slate-950">{data.classroom || 'N/A'}</strong></span>
                <span>LAB – <strong className="font-black text-slate-950">{data.lab || 'N/A'}</strong></span>
                <span>Class Coordinator : <strong className="font-black text-slate-950">{data.classCoordinator || 'N/A'}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Timetable Grid Table */}
        <div className="overflow-x-auto border-2 border-slate-900 bg-white">
          <table className="w-full border-collapse text-xs md:text-sm text-center">
            <thead>
              <tr className="bg-[#d9e1f2] border-b-2 border-slate-900">
                <th className="border-r-2 border-slate-900 p-3 font-black text-slate-950 uppercase min-w-[120px]">Time/Day</th>
                <th className="border-r-2 border-slate-900 p-3 font-black text-slate-950 uppercase min-w-[110px]">Monday</th>
                <th className="border-r-2 border-slate-900 p-3 font-black text-slate-950 uppercase min-w-[110px]">Tuesday</th>
                <th className="border-r-2 border-slate-900 p-3 font-black text-slate-950 uppercase min-w-[110px]">Wednesday</th>
                <th className="border-r-2 border-slate-900 p-3 font-black text-slate-950 uppercase min-w-[110px]">Thursday</th>
                <th className="border-r-2 border-slate-900 p-3 font-black text-slate-950 uppercase min-w-[110px]">Friday</th>
                <th className="p-3 font-black text-slate-950 uppercase min-w-[110px]">Saturday</th>
                {activeViewMode === 'edit' && <th className="bg-slate-100 p-3 w-[60px]" />}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-900">
              {data.rows.map((row, index) => {
                if (row.isBreak) {
                  return (
                    <tr key={index} className="bg-[#fff2cc]">
                      <td className="border-r-2 border-slate-900 p-3 font-black text-slate-950 align-middle">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={row.time}
                            onChange={(e) => handleGridCellChange(index, 'time', e.target.value)}
                            placeholder="Break time"
                            className="w-full bg-amber-50/50 text-center font-bold px-1 py-0.5 border border-dashed border-amber-300 rounded text-xs"
                          />
                        ) : (
                          row.time || 'Break'
                        )}
                      </td>
                      <td colSpan={6} className="p-3 font-black text-slate-950 text-sm align-middle tracking-[0.25em] uppercase text-center border-slate-900">
                        {activeViewMode === 'edit' ? (
                          <div className="flex items-center justify-center gap-2">
                            <select
                              value={row.breakName}
                              onChange={(e) => handleGridCellChange(index, 'breakName', e.target.value)}
                              className="bg-white border border-amber-300 rounded px-2 py-0.5 font-bold text-xs"
                            >
                              <option value="Tea">Tea</option>
                              <option value="Lunch">Lunch</option>
                              <option value="Break">Break</option>
                            </select>
                            <span className="text-[10px] text-amber-800 lowercase tracking-normal">(Spans across all days)</span>
                          </div>
                        ) : (
                          row.breakName || 'Break'
                        )}
                      </td>
                      {activeViewMode === 'edit' && (
                        <td className="bg-slate-50 p-2 align-middle border-l-2 border-slate-900">
                          <button
                            onClick={() => removeRow(index)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                }

                return (
                  <tr key={index} className="hover:bg-slate-50/40">
                    {/* Time cell */}
                    <td className="border-r-2 border-slate-900 p-3 font-black text-slate-950 align-middle bg-[#f2f2f2]">
                      {activeViewMode === 'edit' ? (
                        <input
                          type="text"
                          value={row.time}
                          onChange={(e) => handleGridCellChange(index, 'time', e.target.value)}
                          placeholder="e.g. 9.00 to 10.00 am"
                          className="w-full bg-white text-center font-bold px-1.5 py-1 border border-slate-300 rounded text-xs outline-none"
                        />
                      ) : (
                        row.time
                      )}
                    </td>

                    {/* Monday */}
                    <td className="border-r-2 border-slate-900 p-3 font-bold text-slate-800 align-middle">
                      {activeViewMode === 'edit' ? (
                        <textarea
                          rows={2}
                          value={row.monday}
                          onChange={(e) => handleGridCellChange(index, 'monday', e.target.value)}
                          placeholder="Subject"
                          className="w-full bg-white font-bold p-1 border border-slate-300 rounded text-xs resize-none text-center outline-none"
                        />
                      ) : (
                        <span className="whitespace-pre-line">{row.monday || '—'}</span>
                      )}
                    </td>

                    {/* Tuesday */}
                    <td className="border-r-2 border-slate-900 p-3 font-bold text-slate-800 align-middle">
                      {activeViewMode === 'edit' ? (
                        <textarea
                          rows={2}
                          value={row.tuesday}
                          onChange={(e) => handleGridCellChange(index, 'tuesday', e.target.value)}
                          placeholder="Subject"
                          className="w-full bg-white font-bold p-1 border border-slate-300 rounded text-xs resize-none text-center outline-none"
                        />
                      ) : (
                        <span className="whitespace-pre-line">{row.tuesday || '—'}</span>
                      )}
                    </td>

                    {/* Wednesday */}
                    <td className="border-r-2 border-slate-900 p-3 font-bold text-slate-800 align-middle">
                      {activeViewMode === 'edit' ? (
                        <textarea
                          rows={2}
                          value={row.wednesday}
                          onChange={(e) => handleGridCellChange(index, 'wednesday', e.target.value)}
                          placeholder="Subject"
                          className="w-full bg-white font-bold p-1 border border-slate-300 rounded text-xs resize-none text-center outline-none"
                        />
                      ) : (
                        <span className="whitespace-pre-line">{row.wednesday || '—'}</span>
                      )}
                    </td>

                    {/* Thursday */}
                    <td className="border-r-2 border-slate-900 p-3 font-bold text-slate-800 align-middle">
                      {activeViewMode === 'edit' ? (
                        <textarea
                          rows={2}
                          value={row.thursday}
                          onChange={(e) => handleGridCellChange(index, 'thursday', e.target.value)}
                          placeholder="Subject"
                          className="w-full bg-white font-bold p-1 border border-slate-300 rounded text-xs resize-none text-center outline-none"
                        />
                      ) : (
                        <span className="whitespace-pre-line">{row.thursday || '—'}</span>
                      )}
                    </td>

                    {/* Friday */}
                    <td className="border-r-2 border-slate-900 p-3 font-bold text-slate-800 align-middle">
                      {activeViewMode === 'edit' ? (
                        <textarea
                          rows={2}
                          value={row.friday}
                          onChange={(e) => handleGridCellChange(index, 'friday', e.target.value)}
                          placeholder="Subject"
                          className="w-full bg-white font-bold p-1 border border-slate-300 rounded text-xs resize-none text-center outline-none"
                        />
                      ) : (
                        <span className="whitespace-pre-line">{row.friday || '—'}</span>
                      )}
                    </td>

                    {/* Saturday */}
                    <td className="p-3 font-bold text-slate-800 align-middle">
                      {activeViewMode === 'edit' ? (
                        <textarea
                          rows={2}
                          value={row.saturday}
                          onChange={(e) => handleGridCellChange(index, 'saturday', e.target.value)}
                          placeholder="Subject"
                          className="w-full bg-white font-bold p-1 border border-slate-300 rounded text-xs resize-none text-center outline-none"
                        />
                      ) : (
                        <span className="whitespace-pre-line">{row.saturday || '—'}</span>
                      )}
                    </td>

                    {/* Delete button (Edit mode only) */}
                    {activeViewMode === 'edit' && (
                      <td className="bg-slate-50 p-2 align-middle border-l-2 border-slate-900">
                        <button
                          onClick={() => removeRow(index)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Add Row Buttons in Edit Mode */}
        {activeViewMode === 'edit' && (
          <div className="mt-4 flex flex-wrap gap-2 justify-end">
            <button
              onClick={addLectureRow}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-black uppercase tracking-wider text-[10px] px-3.5 py-2 rounded-xl flex items-center gap-1 transition"
            >
              <Plus size={12} />
              Add Lecture Row
            </button>
            <button
              onClick={() => addBreakRow('Tea')}
              className="bg-[#fff2cc] hover:bg-[#ffe699] text-amber-900 border border-amber-300 font-black uppercase tracking-wider text-[10px] px-3.5 py-2 rounded-xl flex items-center gap-1 transition"
            >
              <Plus size={12} />
              Add Tea Break
            </button>
            <button
              onClick={() => addBreakRow('Lunch')}
              className="bg-[#fff2cc] hover:bg-[#ffe699] text-amber-900 border border-amber-300 font-black uppercase tracking-wider text-[10px] px-3.5 py-2 rounded-xl flex items-center gap-1 transition"
            >
              <Plus size={12} />
              Add Lunch Break
            </button>
          </div>
        )}

        {/* Subject Course Details Syllabus Table */}
        <div className="mt-8">
          <div className="overflow-x-auto border-2 border-slate-900">
            <table className="w-full border-collapse text-xs md:text-sm text-left">
              <thead>
                {/* Table Subject Header */}
                <tr className="bg-[#8db4e2] border-b-2 border-slate-900">
                  <th colSpan={activeViewMode === 'edit' ? 8 : 7} className="p-3 text-center font-black text-slate-950 text-base md:text-lg border-slate-900">
                    {activeViewMode === 'edit' ? (
                      <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                        <span className="text-xs uppercase font-black tracking-wider text-slate-800">Title:</span>
                        <input
                          type="text"
                          value={data.pattern ? `Semester I (${data.pattern})` : 'Semester I'}
                          disabled
                          className="bg-white/80 border border-slate-300 text-center font-extrabold px-2 py-1 rounded"
                        />
                      </div>
                    ) : (
                      'Semester I'
                    )}
                  </th>
                </tr>
                {/* Columns */}
                <tr className="bg-[#f8cbad] border-b-2 border-slate-900 font-black text-slate-950">
                  <th className="border-r-2 border-slate-900 p-2.5 w-[60px] text-center">Sr. No.</th>
                  <th className="border-r-2 border-slate-900 p-2.5 min-w-[200px]">Course Title</th>
                  <th className="border-r-2 border-slate-900 p-2.5 w-[110px] text-center">Course Code</th>
                  <th className="border-r-2 border-slate-900 p-2.5 w-[60px] text-center">CP</th>
                  <th className="border-r-2 border-slate-900 p-2.5 w-[60px] text-center">EXT</th>
                  <th className="border-r-2 border-slate-900 p-2.5 w-[60px] text-center">INT</th>
                  <th className="p-2.5 min-w-[180px]">Faculty</th>
                  {activeViewMode === 'edit' && <th className="bg-slate-100 p-2.5 w-[60px]" />}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.courses.map((course, idx) => {
                  if (course.isHeader) {
                    return (
                      <tr key={idx} className="bg-[#f8cbad] font-black text-slate-950">
                        <td colSpan={7} className="p-2.5 text-left uppercase tracking-wider font-black border-slate-900">
                          {activeViewMode === 'edit' ? (
                            <input
                              type="text"
                              value={course.headerText}
                              onChange={(e) => handleCourseCellChange(idx, 'headerText', e.target.value)}
                              placeholder="e.g. *Practical"
                              className="bg-white/70 border border-slate-300 px-2 py-0.5 rounded font-black text-xs w-full max-w-sm"
                            />
                          ) : (
                            course.headerText || 'Section'
                          )}
                        </td>
                        {activeViewMode === 'edit' && (
                          <td className="bg-slate-100 p-2 text-center align-middle border-l-2 border-slate-900">
                            <button
                              onClick={() => removeCourseRow(idx)}
                              className="p-1 text-rose-600 hover:bg-rose-50 rounded transition"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  }

                  return (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      {/* Sr No */}
                      <td className="border-r-2 border-slate-900 p-2.5 text-center font-bold align-middle">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.srNo}
                            onChange={(e) => handleCourseCellChange(idx, 'srNo', e.target.value)}
                            className="w-full bg-white text-center font-bold px-1 py-0.5 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.srNo
                        )}
                      </td>

                      {/* Course Title */}
                      <td className="border-r-2 border-slate-900 p-2.5 font-bold align-middle text-slate-800">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.courseTitle}
                            onChange={(e) => handleCourseCellChange(idx, 'courseTitle', e.target.value)}
                            placeholder="e.g. Python Programming"
                            className="w-full bg-white font-bold px-2 py-1 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.courseTitle
                        )}
                      </td>

                      {/* Course Code */}
                      <td className="border-r-2 border-slate-900 p-2.5 text-center font-extrabold align-middle text-slate-700">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.courseCode}
                            onChange={(e) => handleCourseCellChange(idx, 'courseCode', e.target.value)}
                            placeholder="e.g. IT11"
                            className="w-full bg-white text-center font-bold px-1.5 py-1 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.courseCode
                        )}
                      </td>

                      {/* CP (Credits) */}
                      <td className="border-r-2 border-slate-900 p-2.5 text-center font-bold align-middle">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.cp}
                            onChange={(e) => handleCourseCellChange(idx, 'cp', e.target.value)}
                            placeholder="CP"
                            className="w-full bg-white text-center font-bold px-1 py-0.5 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.cp || '—'
                        )}
                      </td>

                      {/* EXT */}
                      <td className="border-r-2 border-slate-900 p-2.5 text-center font-bold align-middle">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.ext}
                            onChange={(e) => handleCourseCellChange(idx, 'ext', e.target.value)}
                            placeholder="EXT"
                            className="w-full bg-white text-center font-bold px-1 py-0.5 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.ext || '—'
                        )}
                      </td>

                      {/* INT */}
                      <td className="border-r-2 border-slate-900 p-2.5 text-center font-bold align-middle">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.intMarks}
                            onChange={(e) => handleCourseCellChange(idx, 'intMarks', e.target.value)}
                            placeholder="INT"
                            className="w-full bg-white text-center font-bold px-1 py-0.5 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.intMarks || '—'
                        )}
                      </td>

                      {/* Faculty */}
                      <td className="p-2.5 font-bold align-middle text-slate-800">
                        {activeViewMode === 'edit' ? (
                          <input
                            type="text"
                            value={course.faculty}
                            onChange={(e) => handleCourseCellChange(idx, 'faculty', e.target.value)}
                            placeholder="e.g. Ms. Vaishnavi Tilekar"
                            className="w-full bg-white font-bold px-2 py-1 border border-slate-200 rounded text-xs"
                          />
                        ) : (
                          course.faculty || '—'
                        )}
                      </td>

                      {/* Delete course button */}
                      {activeViewMode === 'edit' && (
                        <td className="bg-slate-100 p-2 text-center align-middle border-l-2 border-slate-900">
                          <button
                            onClick={() => removeCourseRow(idx)}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                })}

                {/* Total Row */}
                <tr className="bg-slate-100 border-t-2 border-slate-900 font-extrabold text-slate-900 text-center">
                  <td colSpan={3} className="border-r-2 border-slate-900 p-2.5 text-right uppercase tracking-wider font-black">
                    Total
                  </td>
                  <td className="border-r-2 border-slate-900 p-2.5 font-black">{totalCredits}</td>
                  <td className="border-r-2 border-slate-900 p-2.5 font-black">{totalExt}</td>
                  <td className="border-r-2 border-slate-900 p-2.5 font-black">{totalInt}</td>
                  <td className="p-2.5" />
                  {activeViewMode === 'edit' && <td className="bg-slate-100 p-2.5" />}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add Course Buttons in Edit Mode */}
          {activeViewMode === 'edit' && (
            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => addCourseRow(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-black uppercase tracking-wider text-[10px] px-3.5 py-2 rounded-xl flex items-center gap-1 transition"
              >
                <Plus size={12} />
                Add Course Row
              </button>
              <button
                onClick={() => addCourseRow(true)}
                className="bg-[#f8cbad] hover:bg-[#f4b183] text-orange-950 border border-orange-300 font-black uppercase tracking-wider text-[10px] px-3.5 py-2 rounded-xl flex items-center gap-1 transition"
              >
                <Plus size={12} />
                Add Category Header Row
              </button>
            </div>
          )}
        </div>

        {/* Studio Save Action (Only visible in active edit mode) */}
        {activeViewMode === 'edit' && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
            <button
              onClick={() => setActiveViewMode('view')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition"
            >
              Preview Document
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white shadow-md text-xs font-black uppercase tracking-wider px-6 py-3 rounded-2xl flex items-center gap-1.5 transition"
            >
              {isSaving ? 'Publishing Schedule...' : 'Save & Publish Timetable'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
