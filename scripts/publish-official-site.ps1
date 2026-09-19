$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$privateKey = Join-Path $env:USERPROFILE ".ssh\aquacore_ovh_deploy_rsa"
$server = "debian@51.255.40.12"
$officialUrl = "https://aquacorecontrol.fr/"

if (-not (Test-Path -LiteralPath $privateKey)) {
    throw "La clé de déploiement OVH est introuvable : $privateKey"
}

Push-Location $projectRoot
try {
    # La publication officielle part toujours d'un build propre et validé.
    & npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Le build de la vitrine a échoué : aucune publication n'a été effectuée."
    }

    $commit = (git rev-parse --short HEAD).Trim()
    if (-not $commit) {
        throw "Impossible d'identifier la révision Git à publier."
    }
    $releaseName = "$commit-$(Get-Date -Format 'yyyyMMddHHmmss')"
    $remoteStaging = "/tmp/aquacore-site-$releaseName"
    $remoteRelease = "/var/www/aquacore/site-releases/$releaseName"
    $distPath = Join-Path $projectRoot "dist"

    & ssh -i $privateKey -o IdentitiesOnly=yes -o BatchMode=yes $server "test ! -e $remoteStaging"
    if ($LASTEXITCODE -ne 0) {
        throw "Le répertoire temporaire distant existe déjà : $remoteStaging"
    }

    & scp -i $privateKey -o IdentitiesOnly=yes -o BatchMode=yes -r $distPath "${server}:$remoteStaging"
    if ($LASTEXITCODE -ne 0) {
        throw "Le transfert vers le VPS a échoué. La vitrine officielle existante est inchangée."
    }

    $remoteCommand = "set -e; test ! -e $remoteRelease; sudo mkdir -p $remoteRelease; sudo cp -a $remoteStaging/. $remoteRelease/; sudo chown -R root:root $remoteRelease; sudo find $remoteRelease -type d -exec chmod 755 {} \;; sudo find $remoteRelease -type f -exec chmod 644 {} \;; sudo ln -sfn $remoteRelease /var/www/aquacore/site-current; sudo nginx -t; sudo systemctl reload nginx; readlink -f /var/www/aquacore/site-current"
    & ssh -i $privateKey -o IdentitiesOnly=yes -o BatchMode=yes $server $remoteCommand
    if ($LASTEXITCODE -ne 0) {
        throw "La bascule officielle a échoué. Vérifiez le VPS avant toute nouvelle tentative."
    }

    $expectedScript = [regex]::Match((Get-Content -LiteralPath (Join-Path $distPath "index.html") -Raw), 'assets/(index-[^"?]+\.js)').Groups[1].Value
    if (-not $expectedScript) {
        throw "Impossible d'identifier le JavaScript versionné du build."
    }
    $response = Invoke-WebRequest -UseBasicParsing -Uri $officialUrl -TimeoutSec 30
    if ($response.StatusCode -ne 200 -or $response.Content -notmatch [regex]::Escape($expectedScript)) {
        throw "La vérification publique a échoué : le domaine officiel ne sert pas encore le build publié."
    }

    Write-Host "Publication vérifiée sur $officialUrl ($releaseName)." -ForegroundColor Green
} finally {
    Pop-Location
}
