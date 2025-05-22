# Define a function to replace spaces and special characters
function Rename-Files {
    param (
        [string]$Path
    )

    Get-ChildItem -Path $Path -File | ForEach-Object {
        $newName = $_.Name -replace ' ', '_' -replace '[^a-zA-Z0-9_\.-]', ''
        Rename-Item -Path $_.FullName -NewName $newName
    }
}

# Call the function with the specified directory
Rename-Files -Path "c:\Users\Administrador\BackendNodejs\uploads\produtos"

# Crie um novo arquivo de script PowerShell (rename_files.ps1) e adicione o código acima:
# New-Item -Path . -Name "rename_files.ps1" -ItemType "file"
# notepad .\rename_files.ps1

# Cole o código no arquivo e salve-o.

# Execute o script: .\rename_files.ps1

