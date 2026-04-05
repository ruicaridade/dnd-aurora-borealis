[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$RepoRoot,

    [Parameter(Mandatory = $true)]
    [string]$VaultPath,

    [string]$ObsidianCommand = "obsidian",

    [string]$DeletedPathsFile = "",

    [string]$NewPathsFile = ""
)

$ErrorActionPreference = "Stop"

function Assert-PathExists {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PathToCheck,

        [Parameter(Mandatory = $true)]
        [string]$Label
    )

    if (-not (Test-Path -LiteralPath $PathToCheck)) {
        throw "$Label does not exist: $PathToCheck"
    }
}

function Invoke-Obsidian {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    Write-Host "Running: $ObsidianCommand $($Arguments -join ' ')"
    & $ObsidianCommand @Arguments

    if ($LASTEXITCODE -ne 0) {
        throw "Obsidian CLI failed with exit code $LASTEXITCODE"
    }
}

Assert-PathExists -PathToCheck $RepoRoot -Label "Repo root"
Assert-PathExists -PathToCheck $VaultPath -Label "Vault path"

$contentItems = @(
    "Aurora Borealis.md",
    "Characters",
    "Images",
    "Items",
    "Locations",
    "Lore",
    "Sessions"
)

Get-Command $ObsidianCommand -ErrorAction Stop | Out-Null

if ($DeletedPathsFile -and (Test-Path -LiteralPath $DeletedPathsFile)) {
    $deletedPaths = Get-Content -LiteralPath $DeletedPathsFile | Where-Object { $_ -and $_.Trim() }

    if ($deletedPaths.Count -gt 0) {
        Push-Location -LiteralPath $VaultPath
        try {
            foreach ($deletedPath in $deletedPaths) {
                Invoke-Obsidian -Arguments @("publish:remove", "path=$deletedPath")
            }
        }
        finally {
            Pop-Location
        }
    }
}

if ($NewPathsFile -and (Test-Path -LiteralPath $NewPathsFile)) {
    $newPaths = Get-Content -LiteralPath $NewPathsFile | Where-Object { $_ -and $_.Trim() }

    if ($newPaths.Count -gt 0) {
        Push-Location -LiteralPath $VaultPath
        try {
            foreach ($newPath in $newPaths) {
                Invoke-Obsidian -Arguments @("publish:add", "path=$newPath")
            }
        }
        finally {
            Pop-Location
        }
    }
}

foreach ($item in $contentItems) {
    $sourcePath = Join-Path $RepoRoot $item
    $targetPath = Join-Path $VaultPath $item

    if (Test-Path -LiteralPath $sourcePath) {
        $sourceItem = Get-Item -LiteralPath $sourcePath

        if ($sourceItem.PSIsContainer) {
            New-Item -ItemType Directory -Path $targetPath -Force | Out-Null

            & robocopy $sourcePath $targetPath /MIR /R:2 /W:2 /NFL /NDL /NJH /NJS /NP | Out-Host
            $robocopyExit = $LASTEXITCODE

            if ($robocopyExit -gt 7) {
                throw "Robocopy failed for '$item' with exit code $robocopyExit"
            }
        }
        else {
            Copy-Item -LiteralPath $sourcePath -Destination $targetPath -Force
        }
    }
    elseif (Test-Path -LiteralPath $targetPath) {
        Remove-Item -LiteralPath $targetPath -Recurse -Force
    }
}

Push-Location -LiteralPath $VaultPath
try {
    Invoke-Obsidian -Arguments @("publish:site")
    Invoke-Obsidian -Arguments @("publish:add", "changed")
}
finally {
    Pop-Location
}
