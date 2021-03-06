/** @babel */
/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Copyright 2017-2018 Andres Mejia <amejia004@gmail.com>. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import atomXtermConfig from '../src/lib/atom-xterm-config'

import os from 'os'
import path from 'path'

describe('Call to getDefaultShellCommand()', () => {
  const savedPlatform = process.platform
  let savedEnv

  beforeEach(() => {
    savedEnv = JSON.parse(JSON.stringify(process.env))
  })

  afterEach(() => {
    process.env = savedEnv
    Object.defineProperty(process, 'platform', {
      'value': savedPlatform
    })
  })

  it('on win32 without COMSPEC set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'win32'
    })
    if (process.env.COMSPEC) {
      delete process.env.COMSPEC
    }
    expect(atomXtermConfig.getDefaultShellCommand()).toBe('cmd.exe')
  })

  it('on win32 with COMSPEC set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'win32'
    })
    let expected = 'somecommand.exe'
    process.env.COMSPEC = expected
    expect(atomXtermConfig.getDefaultShellCommand()).toBe(expected)
  })

  it('on linux without SHELL set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'linux'
    })
    if (process.env.SHELL) {
      delete process.env.SHELL
    }
    expect(atomXtermConfig.getDefaultShellCommand()).toBe('/bin/sh')
  })

  it('on linux with SHELL set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'linux'
    })
    let expected = 'somecommand'
    process.env.SHELL = expected
    expect(atomXtermConfig.getDefaultShellCommand()).toBe(expected)
  })
})

describe('Call to getDefaultArgs()', () => {
  it('return []', () => {
    expect(atomXtermConfig.getDefaultArgs()).toBe('[]')
  })
})

describe('Call to getDefaultTermType()', () => {
  let savedEnv

  beforeEach(() => {
    savedEnv = JSON.parse(JSON.stringify(process.env))
  })

  afterEach(() => {
    process.env = savedEnv
  })

  it('without TERM set', () => {
    if (process.env.TERM) {
      delete process.env.TERM
    }
    expect(atomXtermConfig.getDefaultTermType()).toBe('xterm-256color')
  })

  it('with TERM set', () => {
    let expected = 'sometermtype'
    process.env.TERM = expected
    expect(atomXtermConfig.getDefaultTermType()).toBe(expected)
  })
})

describe('Call to getDefaultCwd()', () => {
  const savedPlatform = process.platform
  let savedEnv

  beforeEach(() => {
    savedEnv = JSON.parse(JSON.stringify(process.env))
  })

  afterEach(() => {
    process.env = savedEnv
    Object.defineProperty(process, 'platform', {
      'value': savedPlatform
    })
  })

  it('on win32', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'win32'
    })
    let expected = 'C:\\some\\dir'
    process.env.USERPROFILE = expected
    expect(atomXtermConfig.getDefaultCwd()).toBe(expected)
  })

  it('on linux', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'linux'
    })
    let expected = '/some/dir'
    process.env.HOME = expected
    expect(atomXtermConfig.getDefaultCwd()).toBe(expected)
  })
})

describe('Call to getDefaultEnv()', () => {
  it('return \'\'', () => {
    expect(atomXtermConfig.getDefaultEnv()).toBe('')
  })
})

describe('Call to getDefaultSetEnv()', () => {
  it('return {}', () => {
    expect(atomXtermConfig.getDefaultSetEnv()).toBe('{}')
  })
})

describe('Call to getDefaultDeleteEnv()', () => {
  it('return []', () => {
    expect(atomXtermConfig.getDefaultDeleteEnv()).toBe('[]')
  })
})

describe('Call to getDefaultEncoding()', () => {
  it('return \'\'', () => {
    expect(atomXtermConfig.getDefaultEncoding()).toBe('')
  })
})

describe('Call to getDefaultFontSize()', () => {
  it('return 14', () => {
    expect(atomXtermConfig.getDefaultFontSize()).toBe(14)
  })
})

describe('Call to getMinimumFontSize()', () => {
  it('return 8', () => {
    expect(atomXtermConfig.getMinimumFontSize()).toBe(8)
  })
})

describe('Call to getMaximumFontSize()', () => {
  it('return 100', () => {
    expect(atomXtermConfig.getMaximumFontSize()).toBe(100)
  })
})

describe('Call to getDefaultLeaveOpenAfterExit()', () => {
  it('return true', () => {
    expect(atomXtermConfig.getDefaultLeaveOpenAfterExit()).toBe(true)
  })
})

describe('Call to getDefaultAllowRelaunchingTerminalsOnStartup()', () => {
  it('return true', () => {
    expect(atomXtermConfig.getDefaultAllowRelaunchingTerminalsOnStartup()).toBe(true)
  })
})

describe('Call to getDefaultRelaunchTerminalOnStartup()', () => {
  it('return true', () => {
    expect(atomXtermConfig.getDefaultRelaunchTerminalOnStartup()).toBe(true)
  })
})

describe('Call to getDefaultXtermOptions()', () => {
  it('return {}', () => {
    expect(atomXtermConfig.getDefaultXtermOptions()).toBe('{}')
  })
})

describe('Call to getUserDataPath()', () => {
  const savedPlatform = process.platform
  let savedEnv

  beforeEach(() => {
    savedEnv = JSON.parse(JSON.stringify(process.env))
  })

  afterEach(() => {
    process.env = savedEnv
    Object.defineProperty(process, 'platform', {
      'value': savedPlatform
    })
  })

  it('on win32 without APPDATA set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'win32'
    })
    if (process.env.APPDATA) {
      delete process.env.APPDATA
    }
    let expected = path.join(os.homedir(), 'AppData', 'Roaming', 'atom-xterm')
    expect(atomXtermConfig.getUserDataPath()).toBe(expected)
  })

  it('on win32 with APPDATA set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'win32'
    })
    process.env.APPDATA = path.join('/some', 'dir')
    let expected = path.join(process.env.APPDATA, 'atom-xterm')
    expect(atomXtermConfig.getUserDataPath()).toBe(expected)
  })

  it('on darwin', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'darwin'
    })
    let expected = path.join(os.homedir(), 'Library', 'Application Support', 'atom-xterm')
    expect(atomXtermConfig.getUserDataPath()).toBe(expected)
  })

  it('on linux without XDG_CONFIG_HOME set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'linux'
    })
    if (process.env.XDG_CONFIG_HOME) {
      delete process.env.XDG_CONFIG_HOME
    }
    let expected = path.join(os.homedir(), '.config', 'atom-xterm')
    expect(atomXtermConfig.getUserDataPath()).toBe(expected)
  })

  it('on linux with XDG_CONFIG_HOME set', () => {
    Object.defineProperty(process, 'platform', {
      'value': 'linux'
    })
    process.env.XDG_CONFIG_HOME = path.join('/some', 'dir')
    let expected = path.join(process.env.XDG_CONFIG_HOME, 'atom-xterm')
    expect(atomXtermConfig.getUserDataPath()).toBe(expected)
  })
})

describe('Call to getDefaultTitle()', () => {
  it('return \'\'', () => {
    expect(atomXtermConfig.getDefaultTitle()).toBe('')
  })
})

describe('Call to getDefaultPromptToStartup()', () => {
  it('return false', () => {
    expect(atomXtermConfig.getDefaultPromptToStartup()).toBe(false)
  })
})
