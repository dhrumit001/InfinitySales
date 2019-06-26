using Microsoft.EntityFrameworkCore.Migrations;

namespace InfinitySales.Migrations
{
    public partial class TenantDetailReferenceOnTenant1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_AbpTenants_TenantDetails_TenantId",
            //    table: "AbpTenants");

            //migrationBuilder.DropIndex(
            //    name: "IX_AbpTenants_TenantId",
            //    table: "AbpTenants");

            //migrationBuilder.DropColumn(
            //    name: "TenantId",
            //    table: "AbpTenants");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "AbpTenants",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AbpTenants_TenantId",
                table: "AbpTenants",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_AbpTenants_TenantDetails_TenantId",
                table: "AbpTenants",
                column: "TenantId",
                principalTable: "TenantDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
