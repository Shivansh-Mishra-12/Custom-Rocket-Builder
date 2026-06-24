import React from 'react'

const HTML = () => {
    return (
        <div className='w-full h-full absolute top-0 left-0 z-99 pointer-events-none'>

            {/* ── Body Parts Panel ── */}
            <div
                ref={panelRef}
                id='Parts'
                className='absolute top-0 left-0 h-full py-20 w-max pointer-events-auto'
                style={{ willChange: 'transform' }}
            >
                <div className='w-full h-full flex flex-col gap-y-2 items-start justify-center ml-3'>
                    {changebles.map((part) => (
                        <button
                            key={part.id}
                            onClick={() => PartSelection(part.obj)}
                            className='hover:bg-[#222] active:bg-[#222] transition-all duration-150 text-white w-fit h-fit py-2 px-7 rounded-lg border border-[#222]'
                        >
                            {part.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Toggle Arrow (mobile only) ── */}
            {IsMobile && (
                <button
                    onClick={() => setPanelOpen((prev) => !prev)}
                    className='pointer-events-auto absolute top-1/2 -translate-y-1/2 z-50'
                    style={{
                        left: PanelOpen ? 'calc(var(--panel-width, 112px) + 4px)' : '4px',
                        transition: 'left 0.35s cubic-bezier(0.8, 0, 0.2, 1)',
                        background: 'rgba(0,0,0,0.55)',
                        borderRadius: '50%',
                        padding: '6px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label={PanelOpen ? 'Close panel' : 'Open panel'}
                >
                    {/* Arrow image – rotated via GSAP */}
                    <img
                        ref={arrowRef}
                        src='./right.png'
                        alt={PanelOpen ? 'Close' : 'Open'}
                        style={{
                            width: 24,
                            height: 24,
                            display: 'block',
                            willChange: 'transform',
                        }}
                    />
                </button>
            )}

            {/* ── Color Picker ── */}
            <div className='Color-Picker w-screen h-1/2 absolute bottom-0 left-0 flex justify-center flex-col gap-3 text-2xl font-semibold uppercase items-center pt-16'>
                <input
                    type='color'
                    value={SelectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className='w-28 h-12 p-0 border outline-none bg-transparent cursor-pointer pointer-events-auto'
                />
                <h1>Choose Color</h1>
            </div>
        </div>
    )
}

export default HTML